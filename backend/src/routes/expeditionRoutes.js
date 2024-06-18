import express from "express";
import {
	getExpeditions,
	getExpeditionById,
	startExpedition,
	abandonExpedition,
	updateProgress,
	createExpedition,
	updateExpedition,
	deleteExpedition,
	getExpeditionsByClient,
} from "../controllers/expeditionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getExpeditions).post(protect, createExpedition);
router
	.route("/:id")
	.get(protect, getExpeditionById)
	.put(protect, updateExpedition)
	.delete(protect, deleteExpedition);
router.post("/start", protect, startExpedition);
router.post("/abandon", protect, abandonExpedition);
router.post("/progress", protect, updateProgress);
router.get("/client/:clientId", protect, getExpeditionsByClient);

export default router;
