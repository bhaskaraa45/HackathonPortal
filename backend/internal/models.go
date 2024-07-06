package internal

type TeamData struct {
	TeamName     string   `json:"team_name"`
	MembersName  []string `json:"members_name"`
	MembersEmail []string `json:"members_email"`
}