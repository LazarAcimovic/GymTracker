

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
    Difficulty INT CHECK (Difficulty BETWEEN 1 AND 10),
    Fatigue INT CHECK (Fatigue BETWEEN 1 AND 10),
    Notes NVARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsDeleted BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_Workouts_Users FOREIGN KEY (UserId) REFERENCES Users(Id),
    CONSTRAINT FK_Workouts_ExerciseTypes FOREIGN KEY (ExerciseTypeId) REFERENCES ExerciseTypes(Id)
);