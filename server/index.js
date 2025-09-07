import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

// Start HTTP server (Express)
const server = app.listen(port, () => {
  console.log("Server is listening....");
});

// Attach WebSocket server to the same HTTP server
const wss = new WebSocketServer({ server });

// Optionally: run WebSocket on a different port
// const wss = new WebSocketServer({ port: 8000 });

// Handle WebSocket connections
wss.on("connection", (ws) => {

  // When server receives a message
  ws.on("message", (data) => {
    console.log("data from client : %s", data);

    // Respond to client
    ws.send("thanks buddy");
  });

  // When client disconnects
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
