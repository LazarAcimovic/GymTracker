

--Conditional drop
IF OBJECT_ID('Workouts', 'U') IS NOT NULL
    DROP TABLE Workouts;

IF OBJECT_ID('ExerciseTypes', 'U') IS NOT NULL
    DROP TABLE ExerciseTypes;

IF OBJECT_ID('Users', 'U') IS NOT NULL
    DROP TABLE Users;

--Tables
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    UserPassword NVARCHAR(255) NOT NULL,
    Gender NVARCHAR(10) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsDeleted BIT NOT NULL DEFAULT 0
);


CREATE TABLE ExerciseTypes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL
);

CREATE TABLE Workouts (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    ExerciseTypeId INT NOT NULL,
    WorkoutDate DATETIME NOT NULL,
    DurationMinutes INT NOT NULL,
    CaloriesBurned INT NOT NULL,
    Difficulty INT NOT NULL CHECK (Difficulty BETWEEN 1 AND 10),
    Fatigue INT NOT NULL CHECK (Fatigue BETWEEN 1 AND 10),
    Notes NVARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsDeleted BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_Workouts_Users FOREIGN KEY (UserId) REFERENCES Users(Id),
    CONSTRAINT FK_Workouts_ExerciseTypes FOREIGN KEY (ExerciseTypeId) REFERENCES ExerciseTypes(Id)
);


--mock insert
INSERT INTO ExerciseTypes (Name) VALUES 
('Cardio'), 
('Strength Training'), 
('Flexibility'), 
('HIIT'), 
('Yoga');


INSERT INTO Users (FirstName, LastName, Email, UserPassword, Gender) VALUES 
('Marko', 'Markovic', 'marko@email.com', 'lozinka123', 'Male'),
('Jelena', 'Jankovic', 'jelena@email.com', 'lozinka123', 'Female'),
('Ivan', 'Ivanovic', 'ivan@email.com', 'lozinka123', 'Male'),
('Milica', 'Milovanovic', 'milica@email.com', 'lozinka123', 'Female'),
('Sasa', 'Simic', 'sasa@email.com', 'lozinka123', 'Male');


INSERT INTO Workouts (UserId, ExerciseTypeId, WorkoutDate, DurationMinutes, CaloriesBurned, Difficulty, Fatigue, Notes) VALUES 
(1, 1, '2024-05-01 08:00:00', 45, 400, 5, 4, 'Jutarnje trčanje na traci'),
(1, 2, '2024-05-03 17:30:00', 60, 350, 8, 7, 'Trening snage - noge'),
(1, 4, '2024-05-05 10:00:00', 30, 500, 9, 9, 'Težak HIIT trening'),
(1, 3, '2024-05-08 18:00:00', 20, 100, 2, 2, 'Istezanje posle posla'),
(2, 2, '2024-05-02 16:00:00', 50, 300, 6, 5, 'Jelenin trening snage');



