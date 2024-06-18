import express from "express";
import { uploadClients, uploadUsers } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/clients", upload.single("file"), protect, uploadClients);
router.post("/users", upload.single("file"), protect, uploadUsers);

export default router;
