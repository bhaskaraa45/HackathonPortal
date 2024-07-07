package email

import (
	"HackathonNPCI/internal"
	"HackathonNPCI/internal/config"
	"bytes"
	"fmt"
	"log"
	"net/smtp"
	"os"
	"strings"
)

var (
	smtpHost = os.Getenv("SMTP_HOST")
	smtpPort = os.Getenv("SMTP_PORT")
	smtpUser = os.Getenv("SMTP_USER")
)

func SendEmail(to string, cc []string, subject string, body []byte) (bool, error) {
	fromName := "E-Cell x NPCI Hackathon"
	from := smtpUser
	// Setup headers
	headers := make(map[string]string)
	headers["From"] = fmt.Sprintf("%s <%s>", fromName, from)
	headers["To"] = to
	if len(cc) > 0 {
		headers["Cc"] = strings.Join(cc, ",")
	}
	headers["Subject"] = subject
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=\"utf-8\""

	// Setup message
	var msg bytes.Buffer
	for k, v := range headers {
		msg.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	msg.WriteString("\r\n")
	msg.Write(body)

	// Recipients
	recipients := append([]string{to}, cc...)

	// Sending email
	err := smtp.SendMail(smtpHost+":"+smtpPort, config.SmtpAuth, from, recipients, msg.Bytes())
	if err != nil {
		log.Printf("Failed to send email: %v\n", err)
		config.LogEmails(to, cc, subject, false)
		return false, err
	}
	config.LogEmails(to, cc, subject, true)
	log.Println("Email sent successfully!")
	return true, nil
}

func LoadRegistrationTemplate(data internal.TeamData) ([]byte, error) {
	filePath := "internal/email/templates/reg.html"
	template, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	// Replace placeholders in the template with actual data
	htmlContent := string(template)
	htmlContent = strings.ReplaceAll(htmlContent, "[Team name]", data.TeamName)
	htmlContent = strings.ReplaceAll(htmlContent, "[M1Email]", data.MembersEmail[0])
	htmlContent = strings.ReplaceAll(htmlContent, "[M1Name]", data.MembersName[0])
	htmlContent = strings.ReplaceAll(htmlContent, "[M2Email]", data.MembersEmail[1])
	htmlContent = strings.ReplaceAll(htmlContent, "[M2Name]", data.MembersName[1])
	htmlContent = strings.ReplaceAll(htmlContent, "[M3Email]", data.MembersEmail[2])
	htmlContent = strings.ReplaceAll(htmlContent, "[M3Name]", data.MembersName[2])
	htmlContent = strings.ReplaceAll(htmlContent, "[M4Email]", data.MembersEmail[3])
	htmlContent = strings.ReplaceAll(htmlContent, "[M4Name]", data.MembersName[3])

	return []byte(htmlContent), nil
}

func LoadLiveTemplate(teamName string, round string) ([]byte, error) {
	filePath := "internal/email/templates/live.html"
	template, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	// Replace placeholders in the template with actual data
	htmlContent := string(template)
	htmlContent = strings.ReplaceAll(htmlContent, "[Team Name]", teamName)
	htmlContent = strings.ReplaceAll(htmlContent, "[RCount]", round)

	return []byte(htmlContent), nil
}

func LoadSolutionSubmissionTemplate(teamName string, round string, sol string) ([]byte, error) {
	filePath := "internal/email/templates/submitted.html"
	template, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	// Replace placeholders in the template with actual data
	htmlContent := string(template)
	htmlContent = strings.ReplaceAll(htmlContent, "[Team Name]", teamName)
	htmlContent = strings.ReplaceAll(htmlContent, "[RCount]", round)
	htmlContent = strings.ReplaceAll(htmlContent, "[Solution]", sol)

	return []byte(htmlContent), nil
}

func LoadSolutionAcceptedTemplate(teamName string, nextRound string) ([]byte, error) {
	filePath := "internal/email/templates/accepted.html"
	template, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	// Replace placeholders in the template with actual data
	htmlContent := string(template)
	htmlContent = strings.ReplaceAll(htmlContent, "[Team Name]", teamName)
	htmlContent = strings.ReplaceAll(htmlContent, "[RCount]", nextRound)

	return []byte(htmlContent), nil
}
