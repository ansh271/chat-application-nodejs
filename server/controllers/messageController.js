import Message from "../models/Message.js";

/**
 * Send a new message
 */
export const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const sender = req.user.id; // assuming auth middleware sets req.user

    if (!receiver || !message) {
      return res.status(400).json({ error: "Receiver and message are required" });
    }

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
};

/**
 * Get conversation between two users
 */
export const getConversation = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
};

/**
 * Update message status (sent, delivered, seen)
 */
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update message status", details: err.message });
  }
};
