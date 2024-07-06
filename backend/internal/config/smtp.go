package config

import (
	"net/smtp"
	"os"
)

var (
	smtpHost     = os.Getenv("SMTP_HOST")
	smtpUser     = os.Getenv("SMTP_USER")
	smtpPassword = os.Getenv("SMTP_PASSWORD")
)

var SmtpAuth smtp.Auth

func InitSMTP() {
	auth := smtp.PlainAuth("", smtpUser, smtpPassword, smtpHost)
	SmtpAuth = auth
}
