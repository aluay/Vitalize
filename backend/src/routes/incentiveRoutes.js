import express from "express";
import {
	getIncentives,
	getIncentiveById,
	startIncentive,
	abandonIncentive,
	updateIncentive,
	createIncentive,
	updateProgress,
	deleteIncentive,
	getIncentivesByClient,
} from "../controllers/incentiveController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getIncentives).post(protect, createIncentive);
router
	.route("/:id")
	.get(protect, getIncentiveById)
	.put(protect, updateIncentive)
	.delete(protect, deleteIncentive);
router.post("/start", protect, startIncentive);
router.post("/abandon", protect, abandonIncentive);
router.post("/progress", protect, updateProgress);
router.get("/client/:clientId", protect, getIncentivesByClient);
export default router;
