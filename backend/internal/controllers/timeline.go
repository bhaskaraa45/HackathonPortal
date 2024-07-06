package controllers

import (
	"HackathonNPCI/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleTimeline(c *gin.Context) {
	c.JSON(http.StatusOK, utils.GetTimeline())
}

func HandleDate(c *gin.Context) {
	c.JSON(http.StatusOK, utils.Round1Start)
}
