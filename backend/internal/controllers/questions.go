package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Answer struct {
	Email  string `json:"email_id"`
	Answer string `json:"answer"`
}

func HandleGetQuestion(c *gin.Context) {
	var email TempStruct
	err := json.NewDecoder(c.Request.Body).Decode(&email)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	question, err := database.GetQuestion(email.Email)
	if err != nil {
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	c.JSON(http.StatusOK, gin.H{"question": question})
}

func HandleSubmitAnswer(c *gin.Context) {
	var data Answer
	err := json.NewDecoder(c.Request.Body).Decode(&data)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	err = database.SubmitAnswer(data.Email, data.Answer)

	if err != nil {
		fmt.Println(err)
		resp := internal.CustomResponse((err.Error()), http.StatusInternalServerError)
		c.JSON(http.StatusBadRequest, resp)
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"message": "Answer submitted!"})
}