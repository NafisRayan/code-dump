-- schema.sql
-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS discussion;

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    nid INTEGER NOT NULL,
    location TEXT NOT NULL
);

-- Insert random data into users table
INSERT INTO users (username, email, password, nid, location)
VALUES
    ('johndoe', 'johndoe@example.com', 'password1', 12345, 'New York'),
    ('janesmith', 'janesmith@example.com', 'password2', 54321, 'Los Angeles'),
    ('alicejones', 'alicejones@example.com', 'password3', 98765, 'Chicago'),
    ('bobwilson', 'bobwilson@example.com', 'password4', 67890, 'Houston'),
    ('emilybrown', 'emilybrown@example.com', 'password5', 45678, 'Miami'),
    ('Nafis', 'nr@g.com', '123', 24680, 'San Francisco'),
    ('nrtg', 'nrtg@g.com', '123', 13579, 'Seattle'),
    ('nam', 'email@g.com', 'password2', 100001, 'Dhaka');

-- Create discussion table
CREATE TABLE discussion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Insert random data into discussion table
INSERT INTO discussion (username, message)
VALUES
    ('johndoe', 'Hello, everyone!'),
    ('janesmith', 'Any plans for the weekend?'),
    ('alicejones', 'I love the weather today.'),
    ('bobwilson', 'Has anyone tried the new coffee shop downtown?'),
    ('emilybrown', 'Looking for a study buddy.'),
    ('Nafis', 'Greetings from San Francisco!'),
    ('nrtg', 'Excited about the upcoming event.'),
    ('nam', 'Discussing plans for the project.');
