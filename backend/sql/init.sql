CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email_id VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    team_id INTEGER NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    signup_ip VARCHAR(45),
    user_agent TEXT
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    current_round INTEGER NOT NULL DEFAULT 1,
    last_submission INTEGER,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id INTEGER NOT NULL UNIQUE,
    statement JSONB NOT NULL
);

CREATE TABLE submissions (
    team_id INTEGER PRIMARY KEY,
    round_one VARCHAR,
    round_two VARCHAR,
    round_three VARCHAR,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint to link users.team_id with teams.id
ALTER TABLE users
ADD CONSTRAINT fk_team
FOREIGN KEY (team_id)
REFERENCES teams(id);

-- Add foreign key constraint to link submissions.team_id with teams.id
ALTER TABLE submissions
ADD CONSTRAINT fk_submissions_team
FOREIGN KEY (team_id)
REFERENCES teams(id);

-- Add 'ADMIN' team by default
INSERT INTO teams (name) VALUES ('ADMIN-AA45');
