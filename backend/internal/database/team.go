package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/joho/godotenv/autoload"
)

type Team struct {
	TeamId       int      `json:"id"`
	TeamName     string   `json:"name"`
	MembersEmail []string `json:"members_email"`
	MembersName  []string `json:"members_name"`
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
		_, err = stmt.Exec(email, name, teamID)
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

func GetTeam(email string) (Team, error) {
	var data Team

	tx, err := db.Begin()
	if err != nil {
		return data, err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query := `SELECT t.id, t.name, array_agg(u.email_id) AS members_email, array_agg(u.name) AS members_name 
				FROM users u 
				JOIN teams t ON u.team_id = t.id 
				WHERE t.id = (SELECT team_id FROM users WHERE email_id = $1)
				GROUP BY t.id, t.name`

	err = tx.QueryRow(query, email).Scan(&data.TeamId, &data.TeamName, &data.MembersEmail, &data.MembersName)
	if err != nil {
		tx.Rollback()
		if err == sql.ErrNoRows {
			fmt.Println("No team found for the email:", email)
			return data, fmt.Errorf("no team found for the email: %v", email)
		}
		return data, fmt.Errorf("could not get team: %v", err)
	}
	if err = tx.Commit(); err != nil {
		return data, fmt.Errorf("could not commit transaction: %v", err)
	}

	return data, nil
}

func PromoteTeam(teamId int) bool {
	tx, err := db.Begin()
	if err != nil {
		log.Println("Error beginning transaction:", err)
		return false
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query := `UPDATE teams SET current_round = current_round + 1 WHERE id = $1`

	_, err = tx.Exec(query, teamId)
	if err != nil {
		log.Println("Error executing update:", err)
		tx.Rollback()
		return false
	}

	err = tx.Commit()
	if err != nil {
		log.Println("Error committing transaction:", err)
		return false
	}

	return true
}
