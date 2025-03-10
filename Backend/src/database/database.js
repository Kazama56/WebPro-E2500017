import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MongoDB)
    console.log("Database connected")
}