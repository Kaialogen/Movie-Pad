-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL);

INSERT INTO Users (username, email, password)
VALUES ('testuser', 'test@test.com', crypt('testpassword', gen_salt('bf')));

SELECT setval('users_id_seq', (SELECT MAX(id) FROM Users));