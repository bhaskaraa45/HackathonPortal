package main

import (
	"HackathonNPCI/internal/config"
	"HackathonNPCI/internal/server"
	"fmt"
)

func main() {

	config.InitSuperTokesn()

	server := server.NewServer()
	err := server.Run()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
