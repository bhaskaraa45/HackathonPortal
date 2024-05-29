package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
)

type Answer struct {
	Answer string `json:"answer"`
}

func HandleGetQuestion(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	question, err := database.GetQuestion(info.Email)
	if err != nil {
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	c.JSON(http.StatusOK, gin.H{"question": question})
}

func HandleSubmitAnswer(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	var data Answer
	err = json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	err = database.SubmitAnswer(info.Email, data.Answer)

	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse((err.Error()), http.StatusInternalServerError)
		c.JSON(http.StatusInternalServerError, resp)
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"message": "Answer submitted!"})
}
