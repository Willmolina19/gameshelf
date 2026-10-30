import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";

import * as gameRepository from "./gameRepository.js";
import { createGameService } from "./gameService.js";
import { createGameController } from "./gameController.js";

const router = Router();

const gameService = createGameService(gameRepository);
const gameController = createGameController(gameService);

router.use(verifyToken);

router.get("/", gameController.getAll);
router.get("/:id", gameController.getById);
router.post("/", gameController.create);
router.put("/:id", gameController.update);
router.delete("/:id", gameController.remove);

export default router;