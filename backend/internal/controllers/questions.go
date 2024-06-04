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

type Answer struct {
	Answer string `json:"answer"`
}

func HandleGetQuestion(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		log.Printf("Error getting user info: %v", err)
		resp := internal.CustomResponse(("session expired"), http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	question, err := database.GetQuestion(info.Email)
	if err != nil {
		log.Printf("Error fetching question: %v", err)
		var statusCode int
		var resp map[string]string
		switch {
		case errors.Is(err, sql.ErrNoRows):
			statusCode = http.StatusNotFound
			resp = internal.CustomResponse(("no question found"), statusCode)
		default:
			statusCode = http.StatusInternalServerError
			resp = internal.CustomResponse(("failed to fetch data"), statusCode)
		}
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	questionJSON := string(question)

	// if reflect.TypeOf(question).Kind() == reflect.Slice { // Check if question is a byte slice
	// 	questionJSON, err = json.Marshal(question) // Marshal to string if necessary
	// 	if err != nil {
	// 		// Log the error
	// 		log.Printf("Error marshalling question data: %v", err)
	// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to process question data"})
	// 		return
	// 	}
	// } else {
	// 	questionJSON = question.(string) // Assume string if not a slice
	// }

	c.JSON(http.StatusOK, questionJSON)
}

func HandleSubmitAnswer(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userID := sessionContainer.GetUserID()
	info, err := thirdparty.GetUserByID(userID)
	if err != nil {
		log.Printf("Error getting user info: %v", err)
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
