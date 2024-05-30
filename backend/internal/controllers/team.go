package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"encoding/json"
	"errors"
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
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusBadRequest, resp)
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

	if err !=nil {
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