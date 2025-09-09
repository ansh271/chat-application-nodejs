import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { WebSocketServer } from "ws";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5137"];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)){
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(morgan("dev"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB error:", err));

// START HTTP SERVER
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// START WEBSOCKET SERVER
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");

  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    console.log("Received message:", msg);

    // Echo message back to all clients
    wss.clients.forEach(client => {
      if (client.readyState === 1) { // OPEN
        client.send(JSON.stringify(msg));
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
