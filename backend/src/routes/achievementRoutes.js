import express from "express";
import {
	getAchievements,
	getAchievementById,
	awardAchievement,
} from "../controllers/achievementController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAchievements);
router.get("/:id", protect, getAchievementById);
router.post("/award", protect, awardAchievement);

export default router;
