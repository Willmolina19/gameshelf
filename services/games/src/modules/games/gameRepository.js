
import sql from "mssql";

export async function findAllGames(userId) {
  const pool = await sql.connect();

  const result = await pool.request()
    .input("userId", sql.Int, userId)
    .query(`
      SELECT id, userId, title, genre, platform, status, rating, imageUrl
      FROM Games
      WHERE userId = @userId
      ORDER BY id DESC
    `);

  return result.recordset;
}

export async function findGameById(id, userId) {
  const pool = await sql.connect();

  const result = await pool.request()
    .input("id", sql.Int, id)
    .input("userId", sql.Int, userId)
    .query(`
      SELECT id, userId, title, genre, platform, status, rating, imageUrl
      FROM Games
      WHERE id = @id AND userId = @userId
    `);

  return result.recordset[0] ?? null;
}

export async function insertGame(userId, game) {
  const pool = await sql.connect();

  const result = await pool.request()
    .input("userId", sql.Int, userId)
    .input("title", sql.NVarChar(150), game.title)
    .input("genre", sql.NVarChar(100), game.genre)
    .input("platform", sql.NVarChar(100), game.platform)
    .input("status", sql.NVarChar(30), game.status)
    .input("rating", sql.Int, game.rating)
    .input("imageUrl", sql.NVarChar(1000), game.imageUrl ?? null)
    .query(`
      INSERT INTO Games (
        userId, title, genre, platform, status, rating, imageUrl
      )
      OUTPUT INSERTED.*
      VALUES (
        @userId, @title, @genre, @platform, @status, @rating, @imageUrl
      )
    `);

  return result.recordset[0];
}

export async function updateGameById(id, userId, game) {
  const pool = await sql.connect();

  const result = await pool.request()
    .input("id", sql.Int, id)
    .input("userId", sql.Int, userId)
    .input("title", sql.NVarChar(150), game.title)
    .input("genre", sql.NVarChar(100), game.genre)
    .input("platform", sql.NVarChar(100), game.platform)
    .input("status", sql.NVarChar(30), game.status)
    .input("rating", sql.Int, game.rating)
    .input("imageUrl", sql.NVarChar(1000), game.imageUrl ?? null)
    .query(`
      UPDATE Games
      SET title = @title,
          genre = @genre,
          platform = @platform,
          status = @status,
          rating = @rating,
          imageUrl = @imageUrl
      OUTPUT INSERTED.*
      WHERE id = @id AND userId = @userId
    `);

  return result.recordset[0] ?? null;
}

export async function deleteGameById(id, userId) {
  const pool = await sql.connect();

  const result = await pool.request()
    .input("id", sql.Int, id)
    .input("userId", sql.Int, userId)
    .query(`
      DELETE FROM Games
      OUTPUT DELETED.id
      WHERE id = @id AND userId = @userId
    `);

  return result.recordset.length > 0;
}
