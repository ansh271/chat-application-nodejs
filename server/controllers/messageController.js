import Message from "../models/message.js";

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id; // from JWT middleware

    if (!receiverId || !message) {
      return res.status(400).json({ error: "Receiver and message are required" });
    }

    // Save message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in sendMessage:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch chat history between two users
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // the person I'm chatting with
    const myId = req.user.id;      // from JWT
    const { page = 1, limit = 20 } = req.query; // pagination

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId },
      ],
    })
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // reverse so frontend sees oldest → newest
    res.json(messages.reverse());
  } catch (err) {
    console.error("Error in getMessages:", err);
    res.status(500).json({ error: "Server error" });
  }
};
