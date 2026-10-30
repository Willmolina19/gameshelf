IF DB_ID('GameShelfAuth') IS NULL
    CREATE DATABASE GameShelfAuth;
GO

USE GameShelfAuth;
GO

IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL,
        email NVARCHAR(150) NOT NULL UNIQUE,
        passwordHash NVARCHAR(255) NOT NULL
    );
END;
GO
