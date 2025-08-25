import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Env variables (optional debug)
const jwtSecret = process.env.JWT_SECRET;
const salt = process.env.SALT;
const mongoUrl = process.env.MONGO_URL;
const stripeKey = process.env.STRIPE_SECRET_KEY;

console.log("ENV Vars Loaded:", { jwtSecret, salt, mongoUrl, stripeKey });

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);




// Test endpoint
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
