package database

import (
	"fmt"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/joho/godotenv/autoload"
	"github.com/lib/pq"
)

type Team struct {
	TeamId       int      `json:"id"`
	TeamName     string   `json:"name"`
	MembersEmail []string `json:"members_email"`
	MembersName  []string `json:"members_name"`
	CurrentRound int      `json:"current_round"`
}

func CreateTeam(teamName string, membersName []string, membersEmail []string, signup_ip string, useragent string) (bool, error) {
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

	query_member := `INSERT INTO users (email_id, name, team_id, signup_ip, user_agent) VALUES ($1, $2, $3, $4, $5)`

	stmt, err := tx.Prepare(query_member)
	if err != nil {
		tx.Rollback()
		return false, fmt.Errorf("could not prepare statement for inserting users: %v", err)
	}
	defer stmt.Close()

	for i, name := range membersName {
		email := membersEmail[i]
		_, err = stmt.Exec(email, name, teamID, signup_ip, useragent)
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

	query := `SELECT t.id, t.name, t.current_round, array_agg(u.email_id) AS members_email, array_agg(u.name) AS members_name 
				FROM users u 
				JOIN teams t ON u.team_id = t.id 
				WHERE t.id = (SELECT team_id FROM users WHERE email_id = $1)
				GROUP BY t.id, t.name`

	var membersEmail pq.StringArray
	var membersName pq.StringArray

	err = tx.QueryRow(query, email).Scan(&data.TeamId, &data.TeamName, &data.CurrentRound, &membersEmail, &membersName)
	if err != nil {
		tx.Rollback()
		return data, err
	}

	data.MembersEmail = membersEmail
	data.MembersName = membersName

	if err = tx.Commit(); err != nil {
		return data, fmt.Errorf("could not commit transaction: %v", err)
	}

	return data, nil
}

func GetCurrentRound(email string) (int, int, error) {
	var data int
	var last int

	tx, err := db.Begin()
	if err != nil {
		return data, last, err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query := `SELECT t.current_round, t.last_submission
				FROM users u 
				JOIN teams t ON u.team_id = t.id 
				WHERE t.id = (SELECT team_id FROM users WHERE email_id = $1)
				GROUP BY t.id, t.name`

	err = tx.QueryRow(query, email).Scan(&data, &last)
	if err != nil {
		tx.Rollback()
		return data, last, err
	}

	if err = tx.Commit(); err != nil {
		return data, last, fmt.Errorf("could not commit transaction: %v", err)
	}

	return data, last, nil
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

	query := `UPDATE teams SET current_round = current_round + 1 WHERE id = $1 AND current_round < 3`

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

func GetAllTeam() ([]Team, error) {
	var result []Team

	tx, err := db.Begin()
	if err != nil {
		return result, err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query := `SELECT t.id, t.name, t.current_round, array_agg(u.email_id) AS members_email, array_agg(u.name) AS members_name 
				FROM users u 
				JOIN teams t ON u.team_id = t.id 
				WHERE t.id > 1
				GROUP BY t.id, t.name`

	rows, err := tx.Query(query)
	if err != nil {
		tx.Rollback()
		return result, err
	}
	defer rows.Close()

	for rows.Next() {
		var data Team
		var membersEmail pq.StringArray
		var membersName pq.StringArray
		if err := rows.Scan(&data.TeamId, &data.TeamName, &data.CurrentRound, &membersEmail, &membersName); err != nil {
			tx.Rollback()
			return result, err
		}

		data.MembersEmail = membersEmail
		data.MembersName = membersName

		result = append(result, data)
	}

	if err = rows.Err(); err != nil {
		tx.Rollback()
		return result, err
	}

	if err = tx.Commit(); err != nil {
		return result, err
	}

	return result, nil
}

func TeamNameValid(name string) bool {
	tx, err := db.Begin()
	if err != nil {
		return false
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query := `SELECT EXISTS (SELECT 1 FROM teams WHERE name = $1 )`
	var exists bool
	err = tx.QueryRow(query, name).Scan(&exists)

	if err != nil {
		tx.Rollback()
		return false
	}

	if err = tx.Commit(); err != nil {
		return false
	}

	return exists
}

func UsersAlreadyExists(emails []string) (bool, []string, error) {
	var ok bool
	var users []string

	tx, err := db.Begin()
	if err != nil {
		return false, users, err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		} else if err != nil {
			tx.Rollback()
		} else {
			err = tx.Commit()
		}
	}()

	query := `SELECT EXISTS (SELECT 1 FROM users WHERE email_id = $1)`

	for _, email := range emails {
		var exists bool
		err := tx.QueryRow(query, email).Scan(&exists)
		if err != nil {
			return ok, users, err
		}
		if exists {
			ok = true
			users = append(users, email)
		}
	}

	return ok, users, err
}
