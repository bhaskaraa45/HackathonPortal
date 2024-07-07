package main

import (
	"HackathonNPCI/internal/config"
	"HackathonNPCI/internal/cron"
	"HackathonNPCI/internal/server"
	"fmt"
)

func main() {

	config.InitSuperTokesn()
	config.InitSMTP()
	config.InitLogger()

	go cron.InitCronJob()

	server := server.NewServer()
	err := server.Run()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
