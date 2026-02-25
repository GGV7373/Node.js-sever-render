-- Active: 1772011816664@@localhost@5432@postgres@public
-- Active: 1772011816664@@localhost@5432@postgres
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO users (name) VALUES 
    ('Alice'),
    ('Bob'),
    ('Charlie');