import Expedition from "../models/Expedition.js";
import User from "../models/User.js";

// Fetch all expeditions
export const getExpeditions = async (req, res) => {
	try {
		const expeditions = await Expedition.find({});
		res.json(expeditions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch a single expedition by ID
export const getExpeditionById = async (req, res) => {
	try {
		const expedition = await Expedition.findById(req.params.id);
		if (expedition) {
			res.json(expedition);
		} else {
			res.status(404).json({ message: "Expedition not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Start an expedition
export const startExpedition = async (req, res) => {
	const { expeditionId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (
			user.expeditions.some((e) => e.expeditionId.toString() === expeditionId)
		) {
			return res.status(400).json({ message: "Expedition already started" });
		}

		user.expeditions.push({ expeditionId });
		await user.save();

		res.status(200).json({ message: "Expedition started" });
	} catch (error) {
		console.error("Error starting expedition:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Abandon an expedition
export const abandonExpedition = async (req, res) => {
	const { expeditionId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		user.expeditions = user.expeditions.filter(
			(e) => e.expeditionId.toString() !== expeditionId
		);
		await user.save();

		res.status(200).json({ message: "Expedition abandoned" });
	} catch (error) {
		console.error("Error abandoning expedition:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update progress
export const updateProgress = async (req, res) => {
	const { expeditionId, progress } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		const expedition = await Expedition.findById(expeditionId);

		const userExpedition = user.expeditions.find(
			(e) => e.expeditionId.toString() === expeditionId
		);

		if (!userExpedition) {
			return res.status(404).json({ message: "Expedition not found" });
		}

		userExpedition.progress += progress;
		if (userExpedition.progress >= expedition.goal) {
			userExpedition.completed = true;
		}
		await user.save();

		res.status(200).json({
			message: "Progress updated",
			completed: userExpedition.completed,
		});
	} catch (error) {
		console.error("Error updating progress:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Create a new expedition
export const createExpedition = async (req, res) => {
	try {
		const { title, description, client } = req.body;
		const expedition = new Expedition({
			title,
			description,
			client,
		});
		const createdExpedition = await expedition.save();
		res.status(201).json(createdExpedition);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Update an expedition
export const updateExpedition = async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		const expedition = await Expedition.findById(id);
		if (!expedition) {
			return res.status(404).json({ message: "Expedition not found" });
		}

		expedition.title = title;
		expedition.description = description;

		const updatedExpedition = await expedition.save();
		res.json(updatedExpedition);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Delete an expedition
export const deleteExpedition = async (req, res) => {
	const { id } = req.params;

	try {
		const expedition = await Expedition.findById(id);
		if (!expedition) {
			return res.status(404).json({ message: "Expedition not found" });
		}

		await expedition.deleteOne();
		res.json({ message: "Expedition removed" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get expeditions by client
export const getExpeditionsByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await Expedition.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching expeditions by client:", error);
		res
			.status(500)
			.json({ message: "Error fetching expeditions", error: error.message });
	}
};
