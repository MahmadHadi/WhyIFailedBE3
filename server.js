import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./Config/MongoDB.js";
import PostRouter from "./Routes/PostRouter.js";
const app = express();
const PORT = process.env.PORT || 4000;
import cors from "cors";

// Config
configDotenv();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API WORKING!");
});

// Routes
app.use("/api/post", PostRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
