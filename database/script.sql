
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

DELETE FROM Workouts WHERE UserId = 1 AND (
    (MONTH(WorkoutDate) = 5 AND YEAR(WorkoutDate) = 2026) OR 
    (MONTH(WorkoutDate) = 2 AND YEAR(WorkoutDate) = 2026)
);



INSERT INTO Workouts 
(UserId, ExerciseTypeId, WorkoutDate, DurationMinutes, CaloriesBurned, Difficulty, Fatigue, Notes) 
VALUES 

(1, 2, '2026-05-01 17:00:00', 60, 450, 7, 6, 'Fokus na čučnjeve i potisak nogama, solidna snaga danas.'),
(1, 4, '2026-05-04 10:00:00', 30, 500, 9, 8, 'HIIT sesija na biciklu, puls je išao do maksimuma.'),
(1, 1, '2026-05-08 08:00:00', 45, 400, 5, 4, 'Lagani kardio u prirodi, oporavak od jučerašnjeg napora.'),
(1, 2, '2026-05-11 16:30:00', 70, 550, 8, 7, 'Novi rekord na mrtvom dizanju! Osećaj je neverovatan.'),
(1, 4, '2026-05-15 18:00:00', 35, 520, 9, 9, 'Tabata protokol, veoma iscrpljujuće ali efikasno.'),
(1, 5, '2026-05-18 09:00:00', 40, 150, 3, 2, 'Jutarnja joga za mobilnost kukova i leđa.'),
(1, 2, '2026-05-22 17:00:00', 65, 480, 7, 7, 'Trening za ramena i triceps, dobra pumpa na kraju.'),
(1, 1, '2026-05-25 08:30:00', 50, 420, 6, 5, 'Kardio na eliptiku uz slušanje podkasta.'),
(1, 4, '2026-05-29 19:00:00', 30, 450, 8, 8, 'Brzi HIIT finišer pred spavanje.'),
(1, 2, '2026-05-31 16:00:00', 60, 430, 7, 6, 'Zatvaranje meseca treningom grudi i bicepsa.'),

(1, 2, '2026-02-02 17:00:00', 60, 450, 7, 5, 'Ulazak u novi ciklus, fokus na kontrolu pokreta.'),
(1, 4, '2026-02-05 18:00:00', 30, 480, 8, 7, 'HIIT intervali na traci, 30 sekundi sprint.'),
(1, 1, '2026-02-09 07:30:00', 45, 380, 6, 4, 'Jutarnje trčanje, stabilan tempo kroz ceo trening.'),
(1, 2, '2026-02-12 16:30:00', 70, 600, 9, 8, 'Težak trening nogu, jedva sam se spustio niz stepenice.'),
(1, 4, '2026-02-14 11:00:00', 35, 500, 8, 7, 'Vikend HIIT, eksplozivnost na nivou.'),
(1, 2, '2026-02-16 17:30:00', 55, 400, 7, 6, 'Grudi i biceps, standardna rutina ponedeljkom.');