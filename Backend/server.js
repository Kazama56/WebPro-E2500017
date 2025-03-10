import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/database/database.js';
import { router as UserRouter } from "./src/route/User.js"
import { router as ReviewRouter } from "./src/route/review.js"
import cors from "cors"
dotenv.config();
const app = express()
app.use(cors())
app.listen(8000, () => {
    connectDB()
    console.log("the server is running")
})

app.get("/send", (req, res) => {
    res.send("hello")

})
app.get("/dada", (req, res) => {
    res.send("Kazama")
})

app.get("/kazama", (req, res) => {
    res.send("Dada")
})
app.use(express.json())
app.use(UserRouter)
app.use(ReviewRouter)