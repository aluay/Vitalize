import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

/**
 * Get all challenges
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getChallenges = async (req, res) => {
	try {
		const challenges = await Challenge.find({});
		res.json(challenges);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Get a challenge by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
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

/**
 * Start a challenge for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
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

/**
 * Abandons a challenge for the current user.
 * @param {Object} req - The request object containing the user and challengeId in the body.
 * @param {string} req.body.challengeId - The ID of the challenge to be abandoned.
 * @param {Object} res - The response object.
 */
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

/**
 * Updates the progress of a challenge for the current user.
 * @param {Object} req - The request object containing the user, challengeId and progress in the body.
 * @param {string} req.body.challengeId - The ID of the challenge to be updated.
 * @param {number} req.body.progress - The amount by which the challenge's progress should be incremented.
 * @param {Object} res - The response object.
 */
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

/**
 * Creates a new challenge.
 * @param {Object} req - The request object containing the title, description and other challenge details in the body.
 * @param {string} req.body.title - The title of the challenge.
 * @param {string} req.body.description - A short description of the challenge.
 * @param {string} req.body.type - The type of the challenge.
 * @param {string} req.body.status - The status of the challenge (e.g., active, completed).
 * @param {string} req.body.visibility - Who can see this challenge (e.g., public, private).
 * @param {Date} req.body.startDate - When the challenge starts.
 * @param {Date} req.body.endDate - When the challenge ends.
 * @param {number} req.body.reward - The reward for completing the challenge.
 * @param {string} req.body.difficulty - The difficulty of the challenge (e.g., easy, medium, hard).
 * @param {number} req.body.goal - The goal for the challenge.
 * @param {string} req.body.completionCriteriaType - How to measure completion (e.g., steps, time).
 * @param {number} req.body.completionCriteriaAmount - The amount required to complete the challenge.
 * @param {string} req.body.client - The client for which this challenge is intended.
 * @param {Object} res - The response object.
 */
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
			completionCriteriaType,
			completionCriteriaAmount,
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
			client,
			completionCriteria: {
				type: completionCriteriaType,
				amount: completionCriteriaAmount,
			},
		});
		const createdChallenge = await challenge.save();
		res.status(201).json(createdChallenge);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update a challenge in the database
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The id of the challenge to update
 * @param {Object} req.body - Data to update the challenge with
 * @return {Object|null} updatedChallenge - The updated challenge or null if no challenge was found
 */
export const updateChallenge = async (req, res) => {
	const { id } = req.params;
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
		completionCriteriaType,
		completionCriteriaAmount,
	} = req.body;

	// Validate required fields
	if (
		!title ||
		!description ||
		!type ||
		!status ||
		!visibility ||
		!startDate ||
		!endDate ||
		!reward ||
		!difficulty ||
		!goal ||
		!completionCriteriaType ||
		!completionCriteriaAmount
	) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const challenge = await Challenge.findById(id).lean();
		if (!challenge) {
			return res.status(404).json({ message: "Challenge not found" });
		}

		// Update only provided fields to avoid overwriting other data
		const updateData = {};
		if (title) updateData.title = title;
		if (description) updateData.description = description;
		if (type) updateData.type = type;
		if (status) updateData.status = status;
		if (visibility) updateData.visibility = visibility;
		if (startDate) updateData.startDate = startDate;
		if (endDate) updateData.endDate = endDate;
		if (reward) updateData.reward = reward;
		if (difficulty) updateData.difficulty = difficulty;
		if (goal) updateData.goal = goal;
		if (completionCriteriaType && completionCriteriaAmount)
			updateData.completionCriteria = {
				type: completionCriteriaType,
				amount: completionCriteriaAmount,
			};

		const updatedChallenge = await Challenge.findByIdAndUpdate(id, updateData, {
			new: true,
		}).lean();
		if (!updatedChallenge) {
			return res.status(404).json({ message: "Challenge not found" });
		}

		res.json(updatedChallenge);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Delete a challenge from the database
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The id of the challenge to delete
 */
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

/**
 * Get all challenges for a specific client
 * @param {Object} req - Express request object
 * @param {string} req.params.clientId - The id of the client to fetch challenges for
 * @return {Array<Challenge>|Error} users - Array of challenges or Error if there was an issue fetching them
 */
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
