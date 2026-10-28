import Review from "./reviewModel.js";
import { findGameById } from "../games/gameRepository.js";

async function verifyGame(gameId, userId) {
  if (!Number.isInteger(gameId) || gameId <= 0) {
    const error = new Error("ID de videojuego inválido");
    error.status = 400;
    throw error;
  }

  const game = await findGameById(gameId, userId);

  if (!game) {
    const error = new Error("Videojuego no encontrado");
    error.status = 404;
    throw error;
  }

  return game;
}

export async function getReviews(gameId, userId) {
  await verifyGame(gameId, userId);

  return Review.find({ gameId, userId }).sort({ createdAt: -1 });
}

export async function createReview(gameId, userId, comment) {
  await verifyGame(gameId, userId);

  if (typeof comment !== "string" || comment.trim().length < 3 || comment.trim().length > 1000) {
    const error = new Error("El comentario debe tener entre 3 y 1000 caracteres");
    error.status = 400;
    throw error;
  }

  return Review.create({
    gameId,
    userId,
    comment: comment.trim(),
  });
}