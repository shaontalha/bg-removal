import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

await connectDB();

// Clerk webhook needs raw body
app.use("/api/user/webhooks", express.raw({ type: "application/json" }));

// Normal JSON parsing for everything else
app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// user routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
