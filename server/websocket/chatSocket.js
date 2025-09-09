import jwt from "jsonwebtoken";
import Message from "../models/message.js";

const users = new Map(); // userId -> ws

export default function chatSocket(wss) {
  wss.on("connection", (ws, req) => {
    const params = new URLSearchParams(req.url.replace("/?", ""));
    const token = params.get("token");

    let userId = null;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      users.set(userId, ws);
      console.log("User connected:", userId);
    } catch (err) {
      ws.close();
      return;
    }

    ws.on("message", async (msg) => {
      try {
        const { to, message } = JSON.parse(msg);

        // Save to DB
        const savedMsg = await Message.create({ sender: userId, receiver: to, message });

        // Send to recipient if online
        if (users.has(to)) {
          users.get(to).send(JSON.stringify({
            from: userId,
            message: savedMsg.message,
            createdAt: savedMsg.createdAt
          }));
        }
      } catch (err) {
        console.log("Invalid message", err);
      }
    });

    ws.on("close", () => {
      users.delete(userId);
      console.log("User disconnected:", userId);
    });
  });
}
