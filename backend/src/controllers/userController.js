import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Function to generate a JWT token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// Update user profile
export const updateUserProfile = async (req, res) => {
	const { username, email, password } = req.body;

	console.log("Received update profile request:", req.body);
	console.log("Current user:", req.user);

	try {
		const user = await User.findById(req.user.id);

		if (user) {
			user.username = username || user.username;
			user.email = email || user.email;

			if (password) {
				user.password = password;
			}

			const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				username: updatedUser.username,
				email: updatedUser.email,
				token: generateToken(updatedUser._id),
			});
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error updating profile:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch the challenges started by the user
export const getUserChallenges = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			"challenges.challengeId"
		);
		res.json(
			user.challenges.map((c) => ({
				challengeId: c.challengeId._id.toString(),
				title: c.challengeId.title,
				description: c.challengeId.description,
				type: c.challengeId.type,
				startedAt: c.startedAt,
				progress: c.progress,
				completed: c.completed,
			}))
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch the routines started by the user
export const getUserRoutines = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			"routines.routineId"
		);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const routines = user.routines.map((r) => ({
			routineId: r.routineId._id.toString(),
			title: r.routineId.title,
			description: r.routineId.description,
			type: r.routineId.type,
			startedAt: r.startedAt,
			progress: r.progress,
			completed: r.completed,
		}));
		res.json(routines);
	} catch (error) {
		console.error("Error fetching user routines:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch the expeditions started by the user
export const getUserExpeditions = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			"expeditions.expeditionId"
		);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const expeditions = user.expeditions.map((e) => ({
			expeditionId: e.expeditionId._id.toString(),
			title: e.expeditionId.title,
			description: e.expeditionId.description,
			type: e.expeditionId.type,
			startedAt: e.startedAt,
			progress: e.progress,
			completed: e.completed,
		}));
		res.json(expeditions);
	} catch (error) {
		console.error("Error fetching user expeditions:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch the achievements earned by the user
export const getUserAchievements = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).populate(
			"achievements.achievementId"
		);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const achievements = user.achievements.map((a) => ({
			achievementId: a.achievementId._id.toString(),
			title: a.achievementId.title,
			description: a.achievementId.description,
			criteria: a.achievementId.criteria,
			achievedAt: a.achievedAt,
		}));
		res.json(achievements);
	} catch (error) {
		console.error("Error fetching user achievements:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Get users by client
export const getUsersByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await User.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users by client:", error); // Log the error
		res
			.status(500)
			.json({ message: "Error fetching users", error: error.message });
	}
};

export const getUserById = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching user data", error: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { username, email, firstName, lastName } = req.body;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		user.username = username;
		user.email = email;
		user.firstName = firstName;
		user.lastName = lastName;
		await user.save();
		res.status(200).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating user", error: error.message });
	}
};
