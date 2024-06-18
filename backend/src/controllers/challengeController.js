import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

// Fetch all challenges
export const getChallenges = async (req, res) => {
	try {
		const challenges = await Challenge.find({});
		res.json(challenges);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch a single challenge by ID
export const getChallengeById = async (req, res) => {
	try {
		const challenge = await Challenge.findById(req.params.id);
		if (challenge) {
			res.json(challenge);
		} else {
			res.status(404).json({ message: "Challenge not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Start a challenge
export const startChallenge = async (req, res) => {
	const { challengeId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (
			user.challenges.some(
				(c) => c.challengeId.toString() === challengeId.toString()
			)
		) {
			return res.status(400).json({ message: "Challenge already started" });
		}

		user.challenges.push({ challengeId: challengeId.toString() });
		await user.save();

		res.status(200).json({ message: "Challenge started" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Abandon a challenge
export const abandonChallenge = async (req, res) => {
	const { challengeId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		user.challenges = user.challenges.filter(
			(c) => c.challengeId.toString() !== challengeId.toString()
		);
		await user.save();

		res.status(200).json({ message: "Challenge abandoned" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update progress
export const updateProgress = async (req, res) => {
	const { challengeId, progress } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		const challenge = user.challenges.find(
			(c) => c.challengeId.toString() === challengeId
		);

		if (!challenge) {
			return res.status(404).json({ message: "Challenge not found" });
		}

		challenge.progress += progress;
		const goal = 10000; // Set this dynamically based on the challenge's goal
		if (challenge.progress >= goal) {
			challenge.completed = true;
		}
		await user.save();

		res
			.status(200)
			.json({ message: "Progress updated", completed: challenge.completed });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Create a new challenge
export const createChallenge = async (req, res) => {
	try {
		const {
			title,
			description,
			type,
			status,
			visibility,
			startDate,
			endDate,
			reward,
			difficulty,
			goal,
			completionCriteria,
			client,
		} = req.body;
		const challenge = new Challenge({
			title,
			description,
			type,
			status,
			visibility,
			startDate,
			endDate,
			reward,
			difficulty,
			goal,
			completionCriteria,
			client,
		});
		const createdChallenge = await challenge.save();
		res.status(201).json(createdChallenge);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update a challenge
export const updateChallenge = async (req, res) => {
	const { id } = req.params;
	const {
		title,
		description,
		type,
		status,
		startDate,
		endDate,
		reward,
		difficulty,
		goal,
		completionCriteria,
	} = req.body;

	try {
		const challenge = await Challenge.findById(id);
		if (!challenge) {
			return res.status(404).json({ message: "Challenge not found" });
		}

		challenge.title = title;
		challenge.description = description;
		challenge.type = type;
		challenge.status = status;
		challenge.startDate = startDate;
		challenge.endDate = endDate;
		challenge.reward = reward;
		challenge.difficulty = difficulty;
		challenge.goal = goal;
		challenge.completionCriteria = completionCriteria;

		const updatedChallenge = await challenge.save();
		res.json(updatedChallenge);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Delete a challenge
export const deleteChallenge = async (req, res) => {
	const { id } = req.params;

	try {
		const challenge = await Challenge.findById(id);
		if (!challenge) {
			return res.status(404).json({ message: "Challenge not found" });
		}

		await challenge.deleteOne();
		res.json({ message: "Challenge removed" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get challenges by client
export const getChallengesByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await Challenge.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching challenges by client:", error);
		res
			.status(500)
			.json({ message: "Error fetching challenges", error: error.message });
	}
};
