function parseGameId(value) {
  const id = Number(value);

  if (
    !/^[1-9]\d*$/.test(String(value)) ||
    !Number.isSafeInteger(id)
  ) {
    const error = new Error("ID de videojuego inválido");
    error.status = 400;
    throw error;
  }

  return id;
}

export function createGameController(gameService) {
  return {
    async getAll(req, res, next) {
      try {
        const games = await gameService.getAll(req.user.id);
        res.status(200).json(games);
      } catch (error) {
        next(error);
      }
    },

    async getById(req, res, next) {
      try {
        const game = await gameService.getById(
          parseGameId(req.params.id),
          req.user.id
        );

        res.status(200).json(game);
      } catch (error) {
        next(error);
      }
    },

    async create(req, res, next) {
      try {
        const game = await gameService.create(
          req.user.id,
          req.body
        );

        res.status(201).json(game);
      } catch (error) {
        next(error);
      }
    },

    async update(req, res, next) {
      try {
        const game = await gameService.update(
          parseGameId(req.params.id),
          req.user.id,
          req.body
        );

        res.status(200).json(game);
      } catch (error) {
        next(error);
      }
    },

    async remove(req, res, next) {
      try {
        await gameService.remove(
          parseGameId(req.params.id),
          req.user.id
        );

        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  };
}