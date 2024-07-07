package config

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var ResponseLogger *zap.Logger
var PromoteLogger *zap.Logger
var EmailLogger *zap.Logger
var TeamLogger *zap.Logger

func InitLogger() {
	logger := zap.Must(zap.NewProduction())
	defer logger.Sync()

	logger.Info("logging started")

	err := WriteLogs("logs/"+strconv.Itoa(45), "hello@bhaskaraa45.me", "message", "xx22btech110xx@iith.ac.in")
	if err != nil {
		fmt.Println(err)
		panic(err.Error())
	}

	PromoteLogger = createLogger("logs/promote.log")
	ResponseLogger = createLogger("logs/response.log")
	EmailLogger = createLogger("logs/mails.log")
	TeamLogger = createLogger("logs/teams.log")
}

func createLogger(fileName string) *zap.Logger {
	file := zapcore.AddSync(&lumberjack.Logger{
		Filename:   fileName,
		MaxSize:    50,
		MaxBackups: 10,
		MaxAge:     30,
	})

	level := zap.NewAtomicLevelAt(zap.InfoLevel)

	productionCfg := zap.NewProductionEncoderConfig()
	productionCfg.TimeKey = "timestamp"
	productionCfg.EncodeTime = zapcore.ISO8601TimeEncoder

	developmentCfg := zap.NewDevelopmentEncoderConfig()
	developmentCfg.EncodeLevel = zapcore.CapitalColorLevelEncoder

	fileEncoder := zapcore.NewJSONEncoder(productionCfg)

	core := zapcore.NewTee(
		zapcore.NewCore(fileEncoder, file, level),
	)

	return zap.New(core)
}

func WriteLogs(fileName string, data ...string) error {
	// Ensure the directory exists
	dir := "logs"
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		return err
	}

	csvFileName := fileName + ".csv"
	if _, err := os.Stat(csvFileName); os.IsNotExist(err) {
		file, err := os.Create(csvFileName)
		if err != nil {
			return err
		}
		defer file.Close()
	}

	file, err := os.OpenFile(csvFileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	record := []string{time.Now().Format("2006-01-02 15:04:05")}
	record = append(record, data...)

	err = writer.Write(record)
	if err != nil {
		return err
	}

	return nil
}

func LogResponse(round int, sol string, user string, team string) {
	err := WriteLogs("logs/"+strconv.Itoa(round), user, team, sol)

	if err != nil {
		log.Printf("Error occured while logging response: %v", err)
	}

	ResponseLogger.Info("New Response", zap.Int("Round", round), zap.String("Response", sol), zap.String("Submitted By", user), zap.String("Team", team))
}

func LogPromote(round int, byWhom string, team string) {
	err := WriteLogs("logs/promotedTo"+strconv.Itoa(round), byWhom, team)

	if err != nil {
		log.Printf("Error occured while logging promotion: %v", err)
	}

	PromoteLogger.Info("Team Advancement", zap.Int("Round", round), zap.String("By", byWhom), zap.String("Team", team))
}

func LogEmails(to string, cc []string, mail string, isSent bool) {
	EmailLogger.Info("", zap.String("To", to), zap.String("CC", strings.Join(cc, ", ")), zap.String("Mail", mail), zap.Bool("isSent", isSent))
}
func LogTeams(teamName string, members []string) {
	TeamLogger.Info("New Team", zap.String("Team Name", teamName), zap.String("Members", strings.Join(members, ", ")))
}
