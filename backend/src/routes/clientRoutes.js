import express from "express";
import {
	getClients,
	getClientById,
	updateClient,
	// deleteClient,
} from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getClients);
router
	.route("/:clientId")
	.get(protect, getClientById); /*.delete(protect, deleteClient);*/
router.put("/:clientId", protect, updateClient);

export default router;
