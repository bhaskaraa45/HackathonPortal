package controllers

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/database"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleGetUser(c *gin.Context) {
	var email TempStruct
	err := json.NewDecoder(c.Request.Body).Decode(&email)
	if err != nil {
		resp := internal.CustomResponse("invalid json data!", http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	user, err := database.GetUserByEmail(email.Email)
	if err != nil {
		resp := internal.CustomResponse(("failed to fetch data"), http.StatusInternalServerError)
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	c.JSON(http.StatusOK, user)
}
