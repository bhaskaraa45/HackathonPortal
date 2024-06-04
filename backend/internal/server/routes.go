package server

import (
	"HackathonNPCI/internal/controllers"
	"HackathonNPCI/internal/database"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
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
		AllowOrigins: []string{"http://localhost:3000", "https://ecell.bhaskaraa45.me"},
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

	s.GET("/", verifySession(nil), s.HelloWorldHandler)
	s.GET("/health", verifySession(nil), s.healthHandler)
	s.GET("/team", verifySession(nil), controllers.HandleGetTeam)
	s.POST("/team", verifySession(nil), controllers.HandleTeamRegister)
	s.POST("/team/promote", verifySession(nil), controllers.HandleRoundPromotion)
	s.GET("/question", verifySession(nil), controllers.HandleGetQuestion)
	s.POST("/question", verifySession(nil), controllers.HandleSubmitAnswer)
	s.GET("/me", verifySession(nil), controllers.HandleGetUser)
	s.GET("/exists", verifySession(nil), controllers.HandleUserExists)
	s.GET("/session-info", verifySession(nil), controllers.HandleSessionUser)
	s.GET("/leaderboard", verifySession(nil), controllers.HandleGetLeaderboard)
}

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, database.Health())
}

func verifySession(options *sessmodels.VerifySessionOptions) gin.HandlerFunc {
	return func(c *gin.Context) {
		session.VerifySession(options, func(rw http.ResponseWriter, r *http.Request) {
			c.Request = c.Request.WithContext(r.Context())
			c.Next()
		})(c.Writer, c.Request)
		c.Abort()
	}
}
