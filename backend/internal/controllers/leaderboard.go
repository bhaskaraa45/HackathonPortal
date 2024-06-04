package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"database/sql"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleGetLeaderboard(c *gin.Context) {
	data, err := database.GetLeaderboard()
	if err != nil {
		log.Printf("Error fetching leaderboard: %v", err)
		var statusCode int
		var resp map[string]string
		switch {
		case errors.Is(err, sql.ErrNoRows):
			statusCode = http.StatusNotFound
			resp = internal.CustomResponse(("no team"), statusCode)
		default:
			statusCode = http.StatusInternalServerError
			resp = internal.CustomResponse(("failed to fetch data"), statusCode)
		}
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	c.JSON(http.StatusOK, data)
}
