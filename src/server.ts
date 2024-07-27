import express from "express";
import { config } from "dotenv";
import http from "http";
import mongoose from "mongoose";
config();
const MONGO_URI = process.env.MONGO_DB!;
const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const startServer = async () => {
  await mongoose.connect(MONGO_URI);
  server.listen(port, async () => {
    console.log("Server listening at port", port);
  });
};
startServer();
