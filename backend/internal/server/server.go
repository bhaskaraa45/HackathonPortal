package server

import (
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"

	"HackathonNPCI/internal/database"
)

type Server struct {
	port int
	db   database.Service
	*gin.Engine
}

func NewServer() *Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	server := &Server{
		port:   port,
		db:     database.New(),
		Engine: gin.Default(),
	}

	server.RegisterRoutes()

	return server
}
