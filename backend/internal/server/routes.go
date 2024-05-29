package server

import (
	"HackathonNPCI/internal/controllers"
	"HackathonNPCI/internal/database"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func (s *Server) RegisterRoutes() {

	// s.Use(func(c *gin.Context) {
	// 	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	// 	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	// 	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	// 	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

	// 	if c.Request.Method == "OPTIONS" {
	// 		c.AbortWithStatus(http.StatusOK)
	// 		return
	// 	}

	// 	c.Next()
	// })

	// CORS
	s.Use(cors.New(cors.Config{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
        AllowHeaders: append([]string{"Content-Type", "Authorization"},
            supertokens.GetAllCORSHeaders()...),
        AllowCredentials: true,
    }))

    s.Use(func(c *gin.Context) {
        supertokens.Middleware(http.HandlerFunc(
            func(rw http.ResponseWriter, r *http.Request) {
                c.Next()
            })).ServeHTTP(c.Writer, c.Request)
        c.Abort()
    })

	s.GET("/", s.HelloWorldHandler)
	s.GET("/health", s.healthHandler)
	s.GET("/team", controllers.HandleGetTeam)
	// s.GET("/team", controllers.HandleGetTeam)
	s.POST("/team", controllers.HandleTeamRegister)
	s.GET("/question", controllers.HandleGetQuestion)
	s.POST("/question", controllers.HandleSubmitAnswer)
	s.GET("/user", controllers.HandleGetUser)
}

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, database.Health())
}
