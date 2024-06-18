import express from "express";
import {
	getChallenges,
	getChallengeById,
	startChallenge,
	abandonChallenge,
	updateProgress,
	createChallenge,
	updateChallenge,
	deleteChallenge,
	getChallengesByClient,
} from "../controllers/challengeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getChallenges).post(protect, createChallenge);
router
	.route("/:id")
	.get(protect, getChallengeById)
	.put(protect, updateChallenge)
	.delete(protect, deleteChallenge);
router.post("/start", protect, startChallenge);
router.post("/abandon", protect, abandonChallenge);
router.post("/progress", protect, updateProgress);
router.get("/client/:clientId", protect, getChallengesByClient);

export default router;
