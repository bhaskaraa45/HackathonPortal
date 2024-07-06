package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"HackathonNPCI/internal/email"
	"HackathonNPCI/internal/utils"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
)

type TeamPromoteData struct {
	TeamID int `json:"team_id"`
}

type TempStruct struct {
	Email string `json:"email_id"`
}

func HandleTeamRegister(c *gin.Context) {
	var data internal.TeamData
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	if data.TeamName == "" || len(data.MembersEmail) == 0 || len(data.MembersName) == 0 || len(data.MembersEmail) != len(data.MembersName) {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	r, _ := utils.WhatIsCurrentRound()

	if r != 0 {
		c.JSON(http.StatusTeapot, gin.H{"message": "Registration for the NPCI x E-Cell IIT Hyderabad Hackathon is now closed!"})
		return
	}

	ip := c.ClientIP()
	userAgent := c.Request.UserAgent()

	ok, usrs, err := database.UsersAlreadyExists(data.MembersEmail)

	if err != nil {
		fmt.Println(err)
		c.AbortWithError(http.StatusInternalServerError, errors.New("internal server error"))
		return
	}

	if ok {
		var msg string
		if len(usrs) == 1 {
			msg = fmt.Sprintf("This User is already registered with another team: \n\n %s", usrs[0])
		} else {
			msg = fmt.Sprintf("These Users are already registered with another team: \n\n %s", strings.Join(usrs, "\n"))
		}
		fmt.Println("Users already exist: ", usrs)
		c.JSON(http.StatusIMUsed, gin.H{"message": msg})
		return
	}

	content, err := email.LoadRegistrationTemplate(data)

	if err != nil {
		fmt.Println(err)
		c.AbortWithError(http.StatusInternalServerError, errors.New("internal server error"))
		return
	}

	res, err := database.CreateTeam(data.TeamName, data.MembersName, data.MembersEmail, ip, userAgent)

	if err != nil || !res {
		fmt.Println(err)
		c.AbortWithError(http.StatusInternalServerError, errors.New("internal server error"))
		return
	}

	subject := "Registration Successful! Welcome to the NPCI x E-Cell IITH Hackathon"
	email.SendEmail(data.MembersEmail[0], data.MembersEmail[1:4], subject, content)

	resp := internal.CustomResponse("Successfully Team Registered", http.StatusOK)
	c.JSON(http.StatusOK, resp)
}

func HandleGetTeam(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	team, err := database.GetTeam(info.Email)
	if err != nil {
		log.Printf("Error fetching team: %v", err)
		var statusCode int
		var resp map[string]string
		switch {
		case errors.Is(err, sql.ErrNoRows):
			statusCode = http.StatusNotFound
			resp = internal.CustomResponse(("no team found"), statusCode)
		default:
			statusCode = http.StatusInternalServerError
			resp = internal.CustomResponse(("failed to fetch data"), statusCode)
		}
		c.JSON(statusCode, resp)
		return
	}

	c.JSON(http.StatusOK, team)
}

func HandleRoundPromotion(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		resp := internal.CustomResponse(("Session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	log.Printf("%v tried admin access\n", info.Email)
	user, err := database.GetUserByEmail(info.Email)

	if err != nil {
		resp := internal.CustomResponse(("Unauthorized user"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	if !user.IsAdmin {
		resp := internal.CustomResponse(("Unauthorized user"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	var data TeamPromoteData
	err = json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("Invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	team, err := database.GetTeamByTeamId(data.TeamID)

	if err != nil {
		log.Println(err)
		resp := internal.CustomResponse("Failed to promote data, please try again later", http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	if team.CurrentRound != team.LastSubmission {
		c.JSON(http.StatusTeapot, gin.H{"message": "This team cannot be promoted as they didn't submit their answer for the last round yet."})
		return
	}

	content, err := email.LoadSolutionAcceptedTemplate(team.TeamName, strconv.Itoa(team.CurrentRound+1))

	if err != nil {
		log.Println(err)
		resp := internal.CustomResponse("Failed to promote data, please try again later", http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	result := database.PromoteTeam(data.TeamID)

	if !result {
		log.Println(err)
		resp := internal.CustomResponse("Failed to promote data, please try again later", http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	if team.CurrentRound < 3 {
		subject := fmt.Sprintf("Congratulations! You're Advancing to Round %v | NPCI x E-Cell IITH Hackathon", team.CurrentRound+1)
		email.SendEmail(team.MembersEmail[0], team.MembersEmail[1:4], subject, content)
	}

	msg := fmt.Sprintf("team_id: %v Sucessfully promoted to next round!", data.TeamID)

	resp := internal.CustomResponse(msg, http.StatusOK)
	c.JSON(http.StatusOK, resp)
}

func HandleGetAllTeam(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	log.Printf("%v tried admin access\n", info.Email)
	isRegisterd, isAdmin := database.UserExists(info.Email)

	if !isRegisterd || !isAdmin {
		resp := internal.CustomResponse(("unauthorized user"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	team, err := database.GetAllTeam()
	if err != nil {
		log.Printf("Error fetching all team: %v", err)
		var statusCode int
		var resp map[string]string
		switch {
		case errors.Is(err, sql.ErrNoRows):
			statusCode = http.StatusNotFound
			resp = internal.CustomResponse(("no team found"), statusCode)
		default:
			statusCode = http.StatusInternalServerError
			resp = internal.CustomResponse(("failed to fetch data"), statusCode)
		}
		c.JSON(statusCode, resp)
		return
	}

	c.JSON(http.StatusOK, team)
}

func HandleTeamNameExists(c *gin.Context) {
	type Model struct {
		TeamName string `json:"team_name"`
	}
	var data Model
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	if data.TeamName == "" {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	exists := database.TeamNameValid(data.TeamName)

	c.JSON(http.StatusOK, gin.H{"valid": !exists})
}
