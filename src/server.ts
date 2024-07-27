import express from "express";
import { config } from "dotenv";
import http from "http";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route";
import expenseRouter from "./routes/expense.route";

config();
const MONGO_URI = process.env.MONGO_DB!;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      messsage: "Internal Server Error",
    });
  }
});
app.use("/auth", authRoute);
app.use("/expense", expenseRouter);
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const startServer = async () => {
  await mongoose.connect(MONGO_URI);
  server.listen(port, async () => {
    console.log("Server listening at port", port);
  });
};
startServer();
