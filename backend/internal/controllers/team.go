package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TeamData struct {
	TeamName     string   `json:"team_name"`
	MembersName  []string `json:"members_name"`
	MembersEmail []string `json:"members_email"`
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

	res, err := database.CreateTeam(data.TeamName, data.MembersName, data.MembersEmail)

	if err != nil || !res {
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
	var email TempStruct
	err := json.NewDecoder(c.Request.Body).Decode(&email)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	team, err := database.GetTeam(email.Email)
	if err != nil {
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	c.JSON(http.StatusOK, team)
}

func HandleRoundPromotion(c *gin.Context){
	
}