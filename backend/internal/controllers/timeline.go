package controllers

import (
	"HackathonNPCI/internal/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func HandleTimeline(c *gin.Context) {
	c.JSON(http.StatusOK, utils.GetTimeline())
}

func HandleDate(c *gin.Context) {
	c.JSON(http.StatusOK, time.Date(2024, 7, 1, 0, 0, 0, 0, time.Local))
}
