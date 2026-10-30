import "dotenv/config";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "gateway" });
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_URL || "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: { "^/": "/api/auth/" },
  })
);

app.use(
  "/api/games",
  createProxyMiddleware({
    target: process.env.GAMES_URL || "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/": "/api/games/" },
  })
);

app.use(
  "/api/reviews",
  createProxyMiddleware({
    target: process.env.GAMES_URL || "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/": "/api/reviews/" },
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway funcionando en puerto ${PORT}`);
});
