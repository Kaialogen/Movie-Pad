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

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    movie_ids INTEGER[] NOT NULL,
    rent_days INTEGER[] NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    card_name VARCHAR(100) NOT NULL,
    card_number VARCHAR(20) NOT NULL,
    card_expiry VARCHAR(7) NOT NULL,
    card_cvc VARCHAR(4) NOT NULL
);