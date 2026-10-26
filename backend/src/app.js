import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());

// Ruta para comprobar que la API funciona
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "GameShelf API funcionando",
  });
});

export default app;