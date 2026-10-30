IF DB_ID('GameShelfGames') IS NULL
    CREATE DATABASE GameShelfGames;
GO

USE GameShelfGames;
GO

IF OBJECT_ID('dbo.Games', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Games (
        id INT IDENTITY(1,1) PRIMARY KEY,
        userId INT NOT NULL,
        title NVARCHAR(150) NOT NULL,
        genre NVARCHAR(100),
        platform NVARCHAR(100),
        status NVARCHAR(30) NOT NULL DEFAULT 'pendiente',
        rating INT NULL,
        imageUrl NVARCHAR(1000) NULL,

        CONSTRAINT CK_Games_Rating
            CHECK (rating BETWEEN 0 AND 10),

        CONSTRAINT CK_Games_Status
            CHECK (status IN ('pendiente', 'jugando', 'completado'))
    );
END;
GO
