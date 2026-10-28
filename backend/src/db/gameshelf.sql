-- Base de datos de GameShelf
IF DB_ID('GameShelfDB') IS NULL
    CREATE DATABASE GameShelfDB;
GO

USE GameShelfDB;
GO

-- Tabla de usuarios
IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL,
        email NVARCHAR(150) NOT NULL UNIQUE,
        passwordHash NVARCHAR(255) NOT NULL
    );
END;
GO

IF OBJECT_ID('dbo.Games', 'U') IS NULL
BEGIN
    CREATE TABLE Games (
        id INT IDENTITY(1,1) PRIMARY KEY,
        userId INT NOT NULL,
        title NVARCHAR(150) NOT NULL,
        genre NVARCHAR(100),
        platform NVARCHAR(100),
        status NVARCHAR(30) NOT NULL DEFAULT 'pendiente',
        rating INT NULL,

        CONSTRAINT FK_Games_Users
            FOREIGN KEY (userId) REFERENCES Users(id),

        CONSTRAINT CK_Games_Rating
            CHECK (rating BETWEEN 0 AND 10),

        CONSTRAINT CK_Games_Status
            CHECK (status IN ('pendiente', 'jugando', 'completado'))
    );
END;
GO