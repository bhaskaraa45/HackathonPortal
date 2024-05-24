CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email_id VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    team_id INTEGER NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    signup_ip VARCHAR(45)
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    current_round INTEGER NOT NULL DEFAULT 1,
    last_submission INTEGER
);

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    statement VARCHAR NOT NULL,
    hints jsonb
);

CREATE TABLE submissions(
    team_id INTEGER PRIMARY KEY,
    rounds VARCHAR[]
);

-- a foreign key constraint to link users.team_id with teams.id
ALTER TABLE users
ADD CONSTRAINT fk_team
FOREIGN KEY (team_id)
REFERENCES teams(id);

-- a foreign key constraint to link submissions.team_id with teams.id
ALTER TABLE submissions
ADD CONSTRAINT fk_submissions_team
FOREIGN KEY (team_id)
REFERENCES teams(id);