
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";
import { sendMessage, getConversation, updateMessageStatus } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:userId/:friendId", authMiddleware, getConversation);
router.put("/:id/status", authMiddleware, updateMessageStatus);

export default router;
