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

-- Create Movies table
CREATE TABLE IF NOT EXISTS Movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    year INT,
    genre VARCHAR(100),
    director VARCHAR(100),
    writer VARCHAR(200),
    actors TEXT,
    description TEXT,
    release_date DATE,
    image_url TEXT,
    video_url TEXT,
    price NUMERIC(10, 2) NOT NULL
);

-- Insert sample movies
INSERT INTO Movies (id, title, year, genre, director, writer, actors, description, release_date, image_url, video_url, price) VALUES
(1, 'Shang-Chi and the Legend of the Ten Rings', 2021, 'Action, Adventure, Fantasy', 'Destin Daniel Cretton', 'Dave Callaham, Destin Daniel Cretton, Andrew Lanham', 'Simu Liu, Awkwafina, Tony Chiu-Wai Leung', 'Shang-Chi, a martial artist, lives a quiet life after he leaves his father and the shadowy Ten Rings organisation behind. Years later, he is forced to confront his past when the Ten Rings attack him.', '2021-09-03', '/images/Shang-Chi.jpg', 'https://www.youtube.com/embed/8YjFbMbfXaQ', 2.49),
(2, 'PAW Patrol: The Movie', 2021, 'Animation, Adventure, Comedy', 'Cal Brunker', 'Bob Barlen, Cal Brunker, Billy Frolick', 'Iain Armitage, Will Brisbin, Ron Pardo', 'When their biggest rival, Humdinger, starts wreaking havoc as the mayor of Adventure City, Ryder and everyone''s favorite heroic pups kick into high gear to face the challenge. Armed with exciting new gadgets and gear, the PAW Patrol joins forces with a savvy dachshund to save the citizens of Adventure City.', '2021-08-20', '/images/paw_patrol.jpg', 'https://www.youtube.com/embed/LRMTr2VZcr8', 2.99),
(3, 'Spider-Man 3', 2007, 'Action, Adventure, Sci-Fi', 'Sam Raimi', 'Sam Raimi, Ivan Raimi, Alvin Sargent', 'Tobey Maguire, Kirsten Dunst, Topher Grace', 'Peter Parker becomes one with a symbiotic alien that bolsters his Spider-Man avatar and affects his psyche. He also has to deal with Sandman and maintain a fragmented relationship with Mary Jane.', '2007-05-04', '/images/spider-man3.jpg', 'https://www.youtube.com/embed/e5wUilOeOmg', 0.5),
(4, 'Don''t Breathe', 2016, 'Crime, Horror, Thriller', 'Fede Alvarez', 'Fede Alvarez, Rodo Sayagues', 'Stephen Lang, Jane Levy, Dylan Minnette', 'Three delinquents break into the house of Norman, a Gulf War veteran who is blind, to steal his money. However, much to their horror, they discover that Norman is not as defenceless as he seems.', '2016-08-26', '/images/dont-breathe.jpg', 'https://www.youtube.com/embed/76yBTNDB6vU', 1.29),
(5, 'The Dark Knight', 2008, 'Action, Crime, Drama', 'Christopher Nolan', 'Jonathan Nolan, Christopher Nolan, David S. Goyer', 'Christian Bale, Heath Ledger, Aaron Eckhart', 'After Gordon, Dent and Batman begin an assault on Gotham''s organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.', '2008-07-18', '/images/Dark-Knight.jpg', 'https://www.youtube.com/embed/LDG9bisJEaI', 2.99),
(6, 'The Matrix', 1999, 'Action, Sci-Fi', 'Lana Wachowski, Lilly Wachowski', 'Lilly Wachowski, Lana Wachowski', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.', '1999-03-31', '/images/matrix.jpg', 'https://www.youtube.com/embed/vKQi3bBA1y8', 1.79),
(7, 'Demonic', 2021, 'Horror', 'Neill Blomkamp', 'Neill Blomkamp', 'Andrea Agur, Nathalie Boltt, Terry Chen', 'A young woman unleashes terrifying demons when supernatural forces at the root of a decades-old rift between mother and daughter are ruthlessly revealed.', '2021-08-20', '/images/demonic.jpg', 'https://www.youtube.com/embed/EYXLKC5xd7Q', 0.49),
(8, 'The Power of the Dog', 2021, 'Drama, Romance, Western', 'Jane Campion', 'Jane Campion, Thomas Savage', 'Benedict Cumberbatch, Kirsten Dunst, Jesse Plemons', 'Charismatic rancher Phil Burbank inspires fear and awe in those around him. When his brother brings home a new wife and her son, Phil torments them until he finds himself exposed to the possibility of love.', '2021-12-01', '/images/the-power-of-the-dog.jpg', 'https://www.youtube.com/embed/LRDPo0CHrko', 1.79),
(9, 'Spider-Man 2', 2004, 'Action, Adventure, Sci-Fi', 'Sam Raimi', 'Stan Lee, Steve Ditko, Alfred Gough', 'Tobey Maguire, Kirsten Dunst, Alfred Molina', 'Peter Parker is dissatisfied with life when he loses his job, the love of his life, Mary Jane, and his powers. Amid all the chaos, he must fight Doctor Octavius who threatens to destroy New York City.', '2004-06-30', '/images/spiderman-2.jpg', 'https://www.youtube.com/embed/enmFqm_N_ZE', 2.49),
(10, 'Wrath of Man', 2021, 'Action, Crime, Thriller', 'Guy Ritchie', 'Nicolas Boukhrief, Éric Besnard, Guy Ritchie', 'Jason Statham, Holt McCallany, Josh Hartnett', 'H is a mysterious man who starts working for a cash moving truck company. He becomes known for using amazing precision and dexterity to neutralise robbers. However, H is actually out for revenge.', '2021-05-07', '/images/wrath-of-man.jpg', 'https://www.youtube.com/embed/EFYEni2gsK0', 0.49),
(11, 'Shrek', 2005, 'Adventure, Animation', 'Andrew Adamson, Vicky Jenson', 'William Seig, Ted Elliot', 'Mike Myers, Eddie Murphy, Cameron Diaz', 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.', '2005-01-01', '/images/shrek.jpg', 'https://www.youtube.com/embed/CwXOrWvPBPk', 1.79),
(12, 'Bee Movie', 2007, 'Animation', 'Simon J Smith, Steve Hickner', 'Jerry Seinfield, Spike Feresten, Barry Marder', 'Jerry Seinfield, Renee Zellweger, Matthew Broderick', 'Barry B. Benson, a bee just graduated from college, is disillusioned at his lone career choice: making honey. On a special trip outside the hive, Barry''s life is saved by Vanessa, a florist in New York City. As their relationship blossoms, he discovers humans actually eat honey, and subsequently decides to sue them.', '2007-01-01', '/images/bee-movie.jpg', 'https://www.youtube.com/embed/VONRQMx78YI', 0.49);

SELECT setval('movies_id_seq', (SELECT MAX(id) FROM Movies));
