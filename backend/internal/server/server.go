package server

import (
	"HackathonNPCI/internal/database"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
)

type Server struct {
	port int
	*gin.Engine
}

func NewServer() *Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	database.InitializeDB();
	
	server := &Server{
		port:   port,
		Engine: gin.Default(),
	}

	server.RegisterRoutes()

	return server
}
