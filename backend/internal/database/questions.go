package database

import (
	"database/sql"
	"fmt"
)

type QuestionModel struct {
	Problem        []byte        `json:"problem"`
	CurrentRound   int           `json:"current_round"`
	LastSubmission sql.NullInt16 `json:"last_submission"`
}

func GetQuestion(email string) (QuestionModel, error) {
	var data QuestionModel
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
        SELECT q.statement, t.current_round, t.last_submission
        FROM users u 
        JOIN teams t ON u.team_id = t.id
        JOIN questions q ON t.current_round = q.id 
        WHERE u.email_id = $1
    `

	err = tx.QueryRow(query, email).Scan(&data.Problem, &data.CurrentRound, &data.LastSubmission)
	if err != nil {
		tx.Rollback()
		return data, fmt.Errorf("could not get question: %v", err)
	}
	if err = tx.Commit(); err != nil {
		return data, fmt.Errorf("could not commit transaction: %v", err)
	}

	return data, nil
}

func GetQuestionByRound(round int, email string) (QuestionModel, error) {
	var data QuestionModel
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
        SELECT q.statement, t.last_submission
        FROM users u 
        JOIN teams t ON u.team_id = t.id
        JOIN questions q ON q.id = $1
        WHERE u.email_id = $2
    `

	err = tx.QueryRow(query, round, email).Scan(&data.Problem, &data.LastSubmission)
	data.CurrentRound = round
	if err != nil {
		tx.Rollback()
		return data, fmt.Errorf("could not get question: %v", err)
	}
	if err = tx.Commit(); err != nil {
		return data, fmt.Errorf("could not commit transaction: %v", err)
	}

	return data, nil
}
