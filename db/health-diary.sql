DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

---------------------------- Creating multiple tables ------------------------------
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


Create table GymWorkout (
  entry_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  description VARCHAR(300),
  duration INT NOT NULL,
  notes VARCHAR(100),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

Create table Nutrition (
  entry_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  number_of_meals INT,
  description VARCHAR(500),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



----------------------------- Inserting multiple tables ----------------------------------

INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic'),
  (2, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest'),
  (3, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out');

INSERT INTO GymWorkout (user_id, entry_date, description, duration, notes) VALUES
  (1, '2024-01-10', 'Chest and Biceps Workout', 75, 'feeling pumped'),
  (2, '2024-02-10', 'Legs and Glutes Workout', 90, 'pushed through the burn'),
  (3, '2024-03-10', 'HIIT Cardio', 60, 'intense session');

INSERT INTO Nutrition (user_id, entry_date, number_of_meals, description) VALUES
  (1, '2024-01-10', 3, 'Breakfast, lunch, and dinner'),
  (2, '2024-02-10', 4, 'Morning snack, lunch, afternoon snack, and dinner'),
  (3, '2024-03-10', 2, 'Pre-workout meal and post-workout meal');


----------------------------- Deleting data from table ----------------------------

-- DELETE FROM Nutrition
-- WHERE user_id = 2;

------------------------------- Updating data in table -----------------------------

-- UPDATE GymWorkout
-- SET description = 'Updated description', duration = 45
-- WHERE entry_id = 1;
