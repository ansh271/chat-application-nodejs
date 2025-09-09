import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB error:", err));

const server = app.listen(8080, () => {
  console.log("Server running on port 8080");
});

// Attach WebSocket separately
import { WebSocketServer } from "ws";
import chatSocket from "./websocket/chatSocket.js";

const wss = new WebSocketServer({ server });
chatSocket(wss);
