package cron

import (
	"HackathonNPCI/internal/database"
	"HackathonNPCI/internal/email"
	"HackathonNPCI/internal/utils"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/robfig/cron/v3"
)

func InitCronJob() {
	c := cron.New()
	scheduleCronJob(c, "Round 1", utils.Round1Start, func() { notifyRoundStart(1) })
	scheduleCronJob(c, "Round 2", utils.Round2Start, func() { notifyRoundStart(2) })

	c.Start()
	log.Println("Cron jobs initialized and started")

	select {}
}

func scheduleCronJob(c *cron.Cron, roundName string, startTime time.Time, jobFunc func()) {
	cronExpr := fmt.Sprintf("%d %d %d %d *", startTime.Minute(), startTime.Hour(), startTime.Day(), startTime.Month())

	_, err := c.AddFunc(cronExpr, jobFunc)
	if err != nil {
		log.Printf("Error scheduling %s cron job: %v\n", roundName, err)
		panic(err.Error())
	}
}

func notifyRoundStart(round int) {
	subject := fmt.Sprintf("Round %d is Now Live! | NPCI x E-Cell IITH Hackathon", round)

	users, err := database.GetAllUserByRound(round)

	if err != nil {
		//TODO: handle this [mail to me may be]
		log.Printf("Error fetching users for round %d: %v", round, err)
		return
	}

	var wg sync.WaitGroup

	for _, user := range users {
		wg.Add(1)
		go func(user database.MailTeamName) {
			defer wg.Done()

			body, err := email.LoadLiveTemplate(user.TeamName, fmt.Sprintf("%d", round))

			if err != nil {
				log.Printf("Failed to load email template for %s: %v", user.Email, err)
				return
			}

			success, err := email.SendEmail(user.Email, nil, subject, body)

			if !success {
				log.Printf("Failed to send email to %s: %v", user.Email, err)
			}
		}(user)
	}

	wg.Wait()
	log.Printf("All emails sent. for round: %v", round)
}
