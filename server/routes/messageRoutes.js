import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/messages → send message
router.post("/", authMiddleware, sendMessage);

// GET /api/messages/:userId → fetch messages with a user
router.get("/:userId", authMiddleware, getMessages);

export default router;
