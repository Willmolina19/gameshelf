import "dotenv/config";
import app from "./app.js";

import { connectSQL } from "./config/sql.js";
import { connectMongo } from "./config/mongo.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectSQL();
    await connectMongo();

    app.listen(PORT, () => {
      console.log(
        `GameShelf API ejecutándose en http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("No se pudo iniciar GameShelf:", error.message);
    process.exit(1);
  }
}

startServer();