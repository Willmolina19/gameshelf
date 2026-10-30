import { validateGame } from "./game.js";
import Review from "../reviews/reviewModel.js";

export function createGameService(repository) {
  return {
    async getAll(userId) {
      return repository.findAllGames(userId);
    },

    async getById(id, userId) {
      const game = await repository.findGameById(id, userId);

      if (!game) {
        const error = new Error("Videojuego no encontrado");
        error.status = 404;
        throw error;
      }

      return game;
    },

    async create(userId, data) {
      const game = validateGame(data);
      return repository.insertGame(userId, game);
    },

    async update(id, userId, data) {
      const game = validateGame(data);

      const updated = await repository.updateGameById(
        id,
        userId,
        game
      );

      if (!updated) {
        const error = new Error("Videojuego no encontrado");
        error.status = 404;
        throw error;
      }

      return updated;
    },

  async remove(id, userId) {
  const deleted = await repository.deleteGameById(id, userId);

  if (!deleted) {
    const error = new Error("Videojuego no encontrado");
    error.status = 404;
    throw error;
  }

  await Review.deleteMany({ gameId: id, userId });

  return deleted;
    },
  };
}