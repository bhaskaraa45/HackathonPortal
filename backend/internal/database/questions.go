package database

import (
	"fmt"
)

func GetQuestion(email string) ([]byte, error) {
	var data []byte
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

    query := `
        SELECT q.statement
        FROM users u
        JOIN teams t ON u.team_id = t.id
        JOIN questions q ON t.current_round = q.id 
        WHERE u.email_id = $1
    `

	// query := `SElECT q.statement FROM users u JOIN teams t ON u.team_id = t.id JOIN questions ON t.current_round = q.id WHERE u.email_id = $1`
	err = tx.QueryRow(query, email).Scan(&data)
	if err != nil {
		tx.Rollback()
		return data, fmt.Errorf("could not get question: %v", err)
	}
	if err = tx.Commit(); err != nil {
		return data, fmt.Errorf("could not commit transaction: %v", err)
	}

	return data, nil
}

