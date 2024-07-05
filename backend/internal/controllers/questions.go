package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"HackathonNPCI/internal/utils"
	"database/sql"
	"errors"
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

	curr, _, err := database.GetCurrentRound(info.Email)

	if err != nil {
		log.Printf("Error fetching current round: %v", err)
		c.JSON(http.StatusInternalServerError, "internal server error")
		return
	}

	r, _ := utils.WhatIsCurrentRound()

	if r == 0 {
		c.JSON(http.StatusTeapot, gin.H{"msg": "Hackathon didn't start yet. Wait untill its starts"})
		return
	}

	if curr != r {
		less := min(curr, r)
		question, err := database.GetQuestionByRound(less, info.Email)
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
		c.JSON(http.StatusOK, gin.H{"problem": string(question.Problem), "current_round": question.CurrentRound, "last_submission": question.LastSubmission.Int16})
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

	// questionJSON := string(question)

	c.JSON(http.StatusOK, gin.H{"problem": string(question.Problem), "current_round": question.CurrentRound, "last_submission": question.LastSubmission.Int16})
}
