import express from "express";
import {
	createMessage,
	getMessagesByClient,
	updateMessage,
	deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMessage);
router.get("/client/:clientId", protect, getMessagesByClient);
router.put("/:messageId", protect, updateMessage);
router.delete("/:messageId", protect, deleteMessage);

export default router;
