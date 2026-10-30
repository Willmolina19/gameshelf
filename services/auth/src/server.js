import "dotenv/config";
import app from "./app.js";
import { connectSQL } from "./config/sql.js";

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectSQL();

    app.listen(PORT, () => {
      console.log(`Auth Service funcionando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error iniciando Auth Service:", error.message);
    process.exit(1);
  }
}

startServer();
