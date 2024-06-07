package database

type Model struct {
	Rank         int    `json:"rank"`
	Name         string `json:"name"`
	CurrentRound int    `json:"currentRound"`
}

func GetLeaderboard() ([]Model, error) {
	var data []Model
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

	query := `SELECT name, current_round FROM teams WHERE id > 1 ORDER BY current_round DESC`

	rows, err := tx.Query(query)
	if err != nil {
		tx.Rollback()
		return data, err
	}
	defer rows.Close()

	rank := 1
	for rows.Next() {
		var model Model
		if err := rows.Scan(&model.Name, &model.CurrentRound); err != nil {
			tx.Rollback()
			return data, err
		}
		model.Rank = rank
		data = append(data, model)
		rank++
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
