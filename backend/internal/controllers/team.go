package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
)

type TeamData struct {
	TeamName     string   `json:"team_name"`
	MembersName  []string `json:"members_name"`
	MembersEmail []string `json:"members_email"`
}

type TeamPromoteData struct {
	TeamID int `json:"team_id"`
}

type TempStruct struct {
	Email string `json:"email_id"`
}

func HandleTeamRegister(c *gin.Context) {
	var data TeamData
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

	ip := c.ClientIP()
	userAgent := c.Request.UserAgent()

	res, err := database.CreateTeam(data.TeamName, data.MembersName, data.MembersEmail, ip, userAgent)

	if err != nil || !res {
		fmt.Println(err)
		c.AbortWithError(http.StatusInternalServerError, errors.New("internal server error"))
		return
	}

	if res {
		resp := internal.CustomResponse("Successfully Team Registered", http.StatusOK)
		c.JSON(http.StatusOK, resp)
		return
	}
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
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	user, err := database.GetUserByEmail(info.Email)

	if err != nil {
		resp := internal.CustomResponse(("unauthorized user"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	if !user.IsAdmin {
		resp := internal.CustomResponse(("unauthorized user"), http.StatusUnauthorized)
		c.JSON(http.StatusUnauthorized, resp)
		return
	}

	var data TeamPromoteData
	err = json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	result := database.PromoteTeam(data.TeamID)

	if !result {
		resp := internal.CustomResponse("failed to promote data, please try again later", http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

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
