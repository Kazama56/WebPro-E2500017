import { get } from "mongoose";
import reviewModel from "../model/review.js";
import { response } from "express";

// Controller function to handle creating and updating reviews
export const createReview = async (req, res) => {
    try {
        const { review, rating, user } = req.body;

        // Parse user data from localStorage JSON string
        const parseIt = JSON.parse(user);
        const userid = parseIt._id;

        // Check if the user has already posted a review
        const existingReview = await reviewModel.findOne({ userid });

        if (existingReview) {
            // Update the existing review
            existingReview.review = review;
            existingReview.rating = rating || 5;

            // Save the updated review
            await existingReview.save();

            return res.status(200).json({
                message: "Your review has been updated successfully",
                data: existingReview,
                isUpdate: true
            });
        } else {
            // Create a new review if none exists
            const newReview = new reviewModel({
                review,
                rating: rating || 5, // Default to 5 if rating is not provided
                userid
            });

            // Save the new review
            await newReview.save();

            return res.status(201).json({
                message: "Review saved successfully",
                data: newReview,
                isUpdate: false
            });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get all reviews
export const getReview = async (req, res) => {
    try {
        const reviews = await reviewModel.find().populate("userid").sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({ data: reviews });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get review by user ID
export const getReviewByUserId = async (req, res) => {
    try {
        const { userid } = req.params;
        const review = await reviewModel.findOne({ userid }).populate("userid");

        if (review) {
            res.status(200).json({ data: review, exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}; 