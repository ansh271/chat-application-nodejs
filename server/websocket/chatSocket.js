import jwt from "jsonwebtoken";
import Message from "../models/Conversation";

const activeUsers = new Map(); // userId -> WebSocket

export default function chatSocket(wss) {
  wss.on("connection", (ws, req) => {
    // Extract token from query string: ws://server?token=XYZ
    const params = new URLSearchParams(req.url.replace("/?", ""));
    const token = params.get("token");

    let userId = null;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      activeUsers.set(userId, ws);
      console.log(`✅ User connected: ${userId}`);
    } catch (err) {
      console.log("❌ Invalid token, closing connection");
      ws.close();
      return;
    }

    // Handle incoming messages
    ws.on("message", async (data) => {
      try {
        const { to, message } = JSON.parse(data);

        if (!to || !message) {
          ws.send(JSON.stringify({ error: "Invalid message format" }));
          return;
        }

        // Save message in DB
        const savedMsg = await Message.create({
          sender: userId,
          receiver: to,
          message,
        });

        const payload = {
          from: userId,
          to,
          message: savedMsg.message,
          timestamp: savedMsg.timestamp,
          status: "sent",
        };

        // Send to receiver if online
        if (activeUsers.has(to)) {
          activeUsers.get(to).send(JSON.stringify(payload));

          // Update DB status -> delivered
          savedMsg.status = "delivered";
          await savedMsg.save();
        }

        // Send ack back to sender
        ws.send(JSON.stringify({ ...payload, status: savedMsg.status }));
      } catch (err) {
        console.error("⚠️ Message handling error:", err);
        ws.send(JSON.stringify({ error: "Failed to process message" }));
      }
    });

    // Handle disconnect
    ws.on("close", () => {
      activeUsers.delete(userId);
      console.log(`🔌 User disconnected: ${userId}`);
    });
  });
}
