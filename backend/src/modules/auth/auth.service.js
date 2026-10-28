import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser({ username, email, password }) {
  const pool = await sql.connect();

  const existingUser = await pool.request()
    .input("email", sql.NVarChar(150), email)
    .query("SELECT id FROM Users WHERE email = @email");

  if (existingUser.recordset.length > 0) {
    const error = new Error("El correo ya está registrado");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.request()
    .input("username", sql.NVarChar(100), username)
    .input("email", sql.NVarChar(150), email)
    .input("passwordHash", sql.NVarChar(255), passwordHash)
    .query(`
      INSERT INTO Users (username, email, passwordHash)
      OUTPUT INSERTED.id, INSERTED.username, INSERTED.email
      VALUES (@username, @email, @passwordHash)
    `);

  return result.recordset[0];
}

export async function loginUser({ email, password }) {
  const pool = await sql.connect();

  const result = await pool.request()
    .input("email", sql.NVarChar(150), email)
    .query(`
      SELECT id, username, email, passwordHash
      FROM Users
      WHERE email = @email
    `);

  const user = result.recordset[0];

  if (!user) {
    const error = new Error("Credenciales incorrectas");
    error.status = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    const error = new Error("Credenciales incorrectas");
    error.status = 401;
    throw error;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}