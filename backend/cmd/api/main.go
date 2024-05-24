package main

import (
	"HackathonNPCI/internal/server"
	"fmt"
)

func main() {

	server := server.NewServer()
	err := server.Run()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
