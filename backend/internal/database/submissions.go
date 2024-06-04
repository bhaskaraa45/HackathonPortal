package database

import (
	"database/sql"
	"fmt"
	"log"
)

type SubmissionModel struct {
	TeamID     int            `json:"team_id"`
	TeamName   string         `json:"team_name"`
	RoundOne   sql.NullString `json:"round_one"`
	RoundTwo   sql.NullString `json:"round_two"`
	RoundThree sql.NullString `json:"round_three"`
}

func GetSubmission(email string) (SubmissionModel, error) {
	var data SubmissionModel
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

	query := `SELECT s.team_id, t.team_name, s.round_one, s.round_two, s.round_three 
				FROM submissions s 
				JOIN teams t ON t.id = s.team_id 
				JOIN users u ON u.team_id = t.id 
				WHERE u.email_id = $1`

	err = tx.QueryRow(query, email).Scan(&data.TeamID, &data.TeamName, &data.RoundOne, &data.RoundTwo, &data.RoundThree)
	if err != nil {
		tx.Rollback()
		return data, err
	}

	if err = tx.Commit(); err != nil {
		log.Printf("could not commit transaction: %v\n", err)
		return data, err
	}

	return data, nil
}

func PostSubmission(email string, ans string) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		} else if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	queryInsert := `INSERT INTO submissions (team_id) SELECT team_id FROM users WHERE email_id = $1 ON CONFLICT (team_id) DO NOTHING`

	_, err = tx.Exec(queryInsert, email)
	if err != nil {
		return fmt.Errorf("could not insert into submissions: %v", err)
	}

	queryUpdate := `
		WITH info AS (
			SELECT team_id, current_round 
			FROM users 
			JOIN teams ON users.team_id = teams.id 
			WHERE users.email_id = $1
		)
		UPDATE submissions 
		SET 
			round_one = CASE WHEN (SELECT current_round FROM info) = 1 AND round_one IS NULL THEN $2 ELSE round_one END,
			round_two = CASE WHEN (SELECT current_round FROM info) = 2 AND round_two IS NULL THEN $2 ELSE round_two END,
			round_three = CASE WHEN (SELECT current_round FROM info) = 3 AND round_three IS NULL THEN $2 ELSE round_three END
		WHERE submissions.team_id = (SELECT team_id FROM info)
	`

	_, err = tx.Exec(queryUpdate, email, ans)
	if err != nil {
		return fmt.Errorf("could not update submissions: %v", err)
	}

	return nil
}

func GetAllSubmissions() ([]SubmissionModel, error) {
	var data []SubmissionModel
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

	query := `SELECT s.team_id, t.name, s.round_one, s.round_two, s.round_three 
				FROM submissions s 
				JOIN teams t ON t.id = s.team_id 
				JOIN users u ON u.team_id = t.id
				GROUP BY s.team_id, t.name`
	rows, err := tx.Query(query)
	if err != nil {
		tx.Rollback()
		return data, err
	}
	defer rows.Close()

	for rows.Next() {
		var model SubmissionModel
		if err := rows.Scan(&model.TeamID, &model.TeamName, &model.RoundOne, &model.RoundTwo, &model.RoundThree); err != nil {
			tx.Rollback()
			return data, err
		}
		data = append(data, model)
	}

	if err = rows.Err(); err != nil {
		tx.Rollback()
		return data, err
	}

	if err = tx.Commit(); err != nil {
		return data, err
	}

	return data, nil
}
