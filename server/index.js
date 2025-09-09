import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Listen for new client connections
wss.on("connection", (ws) => {
  console.log("A client connected!");

  // Listen for messages from a client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // When client disconnects
  ws.on("close", () => {
    console.log("A client disconnected");
  });
});
