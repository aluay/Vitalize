import express from "express";
import {
	getRoutines,
	getRoutineById,
	startRoutine,
	abandonRoutine,
	updateProgress,
	createRoutine,
	updateRoutine,
	deleteRoutine,
	getRoutinesByClient,
} from "../controllers/routineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getRoutines).post(protect, createRoutine);
router
	.route("/:id")
	.get(protect, getRoutineById)
	.put(protect, updateRoutine)
	.delete(protect, deleteRoutine);
router.post("/start", protect, startRoutine);
router.post("/abandon", protect, abandonRoutine);
router.post("/progress", protect, updateProgress);
router.get("/client/:clientId", protect, getRoutinesByClient);
export default router;
