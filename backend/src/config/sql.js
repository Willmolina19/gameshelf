import sql from "mssql";

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 1433),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectSQL() {
  try {
    const pool = await sql.connect(sqlConfig);

    console.log("SQL Server conectado correctamente");

    return pool;
  } catch (error) {
    console.error("Error al conectar SQL Server:", error.message);
    throw error;
  }
}