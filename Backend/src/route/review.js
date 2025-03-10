import express from 'express';
import { createReview, getReview, getReviewByUserId } from "../controller/review.js";

export const router = express.Router();

// Route to handle POST requests for reviews
router.post("/reviews", createReview);
router.get("/reviews", getReview);
router.get("/reviews/user/:userid", getReviewByUserId);

