// Import necessary modules
import express from "express";
import { registerUser, authUser } from "../controllers/authController.js";

// Create a new router
const router = express.Router();

// Define routes for user registration and login
router.post("/register", registerUser);
router.post("/login", authUser);

// Export the router
export default router;
