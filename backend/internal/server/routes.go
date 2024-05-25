package server

import (
	"HackathonNPCI/internal/controllers"
	"HackathonNPCI/internal/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() {

	s.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	})

	s.GET("/", s.HelloWorldHandler)
	s.GET("/health", s.healthHandler)
	s.POST("/team", controllers.HandleTeamRegister)
	s.GET("/team", controllers.HandleTeamRegister)
}

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, database.Health())
}
