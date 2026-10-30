import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    gameId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);