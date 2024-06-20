import express from "express";
import {
	getRules,
	createRule,
	updateRule,
	deleteRule,
	getRulesByClient,
} from "../controllers/ruleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getRules);
router.post("/", protect, createRule);
router.put("/:ruleId", protect, updateRule);
router.delete("/:ruleId", protect, deleteRule);
router.get("/client/:clientId", protect, getRulesByClient);
export default router;
