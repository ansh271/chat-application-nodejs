import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "seen"],
    default: "sent",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries on conversations
messageSchema.index({ sender: 1, receiver: 1, timestamp: 1 });

export default mongoose.model("Message", messageSchema);
