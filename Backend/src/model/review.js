import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;
