import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { listReviews, addReview } from "./reviewController.js";

const router = Router();

router.use(verifyToken);

router.get("/:gameId", listReviews);
router.post("/:gameId", addReview);

export default router;