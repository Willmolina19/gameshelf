import express from "express";
import cors from "cors";
import gameRoutes from "./modules/games/gameRoutes.js";
import reviewRoutes from "./modules/reviews/reviewRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "games" });
});

app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(errorHandler);

export default app;
