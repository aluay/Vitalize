// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors middleware
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import expeditionRoutes from "./routes/expeditionRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import incentiveRoutes from "./routes/incentiveRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// CORS configuration options
// const corsOptions = {
// 	origin: "http://localhost:3000", // Allow only this origin
// 	methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
// 	allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
// };

// Enable CORS for all routes with options
// app.use(cors(corsOptions)); // Use the cors middleware with options

// Enable CORS for all routes with options
app.use(cors());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/expeditions", expeditionRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/incentives", incentiveRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rules", ruleRoutes);

// Define a simple route for testing
app.get("/", (req, res) => {
	res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

// Export the app for testing
export default app;
