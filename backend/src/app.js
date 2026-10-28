import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import gameRoutes from "./modules/games/gameRoutes.js";
import reviewRoutes from "./modules/reviews/reviewRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middlewares generales
app.use(cors());
app.use(express.json());

// Ruta para comprobar el servidor
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "GameShelf API funcionando",
  });
});

// Rutas de los módulos
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);

// Manejo centralizado de errores
app.use(errorHandler);

export default app;