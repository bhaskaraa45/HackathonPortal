package database

import "fmt"

func GetQuestion(email string) (string, error) {
	var data string
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

	query := `SElECT q.statement FROM users u JOIN teams t ON u.team_id = t.id JOIN questions ON t.current_round = q.id WHERE u.email_id = $1`
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

func SubmitAnswer(email string, ans string) (error) {
	tx, err := db.Begin()
	if err != nil {
		return err
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	query := `WITH info AS (
				SELECT team_id, current_round FROM users JOIN teams ON users.team_id = teams.id WHERE users.email_id = $1
			)
			UPDATE submissions SET 
				round_one = CASE WHEN (SELECT current_round FROM info) = 1  AND round_one IS NULL THEN $2 ELSE round_one END,
				round_two = CASE WHEN (SELECT current_round FROM info) = 1  AND round_two IS NULL THEN $2 ELSE round_two END,
				round_three = CASE WHEN (SELECT current_round FROM info) = 1  AND round_three IS NULL THEN $2 ELSE round_three END,
			WHERE team_id = (SELECT team_id FROM info)`

	_, err = tx.Exec(query, email, ans)

	if err != nil {
		tx.Rollback()
		return fmt.Errorf("could not add answer: %v", err)
	}
	if err = tx.Commit(); err != nil {
		return fmt.Errorf("could not commit transaction: %v", err)
	}
	return nil
}
