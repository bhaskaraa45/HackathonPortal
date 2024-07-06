package cron

import (
	"HackathonNPCI/internal/email"
	"HackathonNPCI/internal/utils"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/robfig/cron/v3"
)

func InitCronJob() {
	c := cron.New()
	scheduleCronJob(c, "Round 1", utils.Round1Start, func() { notifyRoundStart(1) })
	scheduleCronJob(c, "Round 2", utils.Round1Start, func() { notifyRoundStart(2) })

	c.Start()
	log.Println("Cron jobs initialized and started")

	select {}
}

func scheduleCronJob(c *cron.Cron, roundName string, startTime time.Time, jobFunc func()) {
	cronExpr := fmt.Sprintf("%d %d %d %d *", startTime.Minute(), startTime.Hour(), startTime.Day(), startTime.Month())

	_, err := c.AddFunc(cronExpr, jobFunc)
	if err != nil {
		fmt.Printf("Error scheduling %s cron job: %v\n", roundName, err)
		panic(err.Error())
	}
}

func notifyRoundStart(round int) {
	subject := fmt.Sprintf("Round %d is Now Live! | NPCI x E-Cell IITH Hackathon", round)
	fmt.Println(subject)

	content, err := email.LoadLiveTemplate("TEST", strconv.Itoa(round))
	if err != nil {
		fmt.Printf("Error scheduling %v\n", err)
	}

	cc := []string{"ms22btech11010@iith.ac.in"}

	email.SendEmail("bhaskarmandal369@gmail.com", cc, subject, content)

}
