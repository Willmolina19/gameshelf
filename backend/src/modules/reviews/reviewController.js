import { getReviews, createReview } from "./reviewService.js";

export async function listReviews(req, res, next) {
  try {
    const reviews = await getReviews(
      Number(req.params.gameId),
      req.user.id
    );

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

export async function addReview(req, res, next) {
  try {
    const review = await createReview(
      Number(req.params.gameId),
      req.user.id,
      req.body.comment
    );

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}