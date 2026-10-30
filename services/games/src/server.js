import { startUserConsumer } from "./messaging/consumer.js";
import "dotenv/config";
import app from "./app.js";
import { connectSQL } from "./config/sql.js";
import { connectMongo } from "./config/mongo.js";

const PORT = process.env.PORT || 3002;

async function startServer() {
  try {
    await connectSQL();
    await connectMongo();
    await startUserConsumer();

    app.listen(PORT, () => {
      console.log(`Games Service funcionando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error iniciando Games Service:", error.message);
    process.exit(1);
  }
}

startServer();

