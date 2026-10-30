import { describe, test, expect, jest } from "@jest/globals";
import { createGameService } from "../src/modules/games/gameService.js";

describe("GameService - pruebas unitarias", () => {
  test("getAll devuelve los videojuegos del usuario", async () => {
    const games = [{ id: 1, title: "Zelda" }];

    const repository = {
      findAllGames: jest.fn().mockResolvedValue(games),
    };

    const service = createGameService(repository);
    const result = await service.getAll(5);

    expect(result).toEqual(games);
    expect(repository.findAllGames).toHaveBeenCalledWith(5);
  });

  test("getById devuelve un videojuego existente", async () => {
    const game = { id: 1, title: "Zelda" };

    const repository = {
      findGameById: jest.fn().mockResolvedValue(game),
    };

    const service = createGameService(repository);
    const result = await service.getById(1, 5);

    expect(result).toEqual(game);
    expect(repository.findGameById).toHaveBeenCalledWith(1, 5);
  });

  test("getById devuelve error 404 si no existe", async () => {
    const repository = {
      findGameById: jest.fn().mockResolvedValue(null),
    };

    const service = createGameService(repository);

    await expect(service.getById(99, 5)).rejects.toMatchObject({
      message: "Videojuego no encontrado",
      status: 404,
    });
  });
});
