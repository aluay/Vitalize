import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	updateUserProfile,
	getUserChallenges,
	getUserRoutines,
	getUserExpeditions,
	getUserAchievements,
	getUsersByClient,
	getUserById,
	updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", protect, updateUserProfile);
router.get("/challenges", protect, getUserChallenges);
router.get("/routines", protect, getUserRoutines);
router.get("/expeditions", protect, getUserExpeditions);
router.get("/achievements", protect, getUserAchievements);
router.get("/client/:clientId", protect, getUsersByClient);
router.get("/:userId", protect, getUserById);
router.put("/:userId", protect, updateUser);
export default router;
