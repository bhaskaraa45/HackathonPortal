package database

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/joho/godotenv/autoload"
)

// type Service interface {
// 	Health() map[string]string
// 	CreateTeam(teamName string, membersName []string, membersEmail []string) (bool, error)
// }

var db *sql.DB

var (
	database = os.Getenv("DB_DATABASE")
	password = os.Getenv("DB_PASSWORD")
	username = os.Getenv("DB_USERNAME")
	port     = os.Getenv("DB_PORT")
	host     = os.Getenv("DB_HOST")
)

func InitializeDB() {
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", username, password, host, port, database)
	var err error
	db, err = sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
}

func Health() map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	err := db.PingContext(ctx)
	if err != nil {
		log.Fatalf(fmt.Sprintf("db down: %v", err))
	}

	return map[string]string{
		"message": "It's healthy",
	}
}

func CreateTeam(teamName string, membersName []string, membersEmail []string) (bool, error) {
	tx, err := db.Begin()
	if err != nil {
		return false, err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query_team := `INSERT INTO teams (name) VALUES ($1) RETURNING id`
	var teamID int
	err = tx.QueryRow(query_team, teamName).Scan(&teamID)
	if err != nil {
		tx.Rollback()
		return false, fmt.Errorf("could not insert team: %v", err)
	}

	//TODO: add signup_ip later
	query_member := `INSERT INTO users (email_id, name, team_id) VALUES ($1, $2, $3)`

	stmt, err := tx.Prepare(query_member)
	if err != nil {
		tx.Rollback()
		return false, fmt.Errorf("could not prepare statement for inserting users: %v", err)
	}
	defer stmt.Close()

	// Inserting each member
	for i, name := range membersName {
		email := membersEmail[i]
		_, err = stmt.Exec(name, email, teamID)
		if err != nil {
			tx.Rollback()
			return false, fmt.Errorf("could not insert user: %v", err)
		}
	}

	if err = tx.Commit(); err != nil {
		return false, fmt.Errorf("could not commit transaction: %v", err)
	}

	return true, nil
}
