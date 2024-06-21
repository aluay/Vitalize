import Incentive from "../models/Incentive.js";
import User from "../models/User.js";

/**
 * Fetch all incentives
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getIncentives = async (req, res) => {
	try {
		const incentives = await Incentive.find({});
		res.json(incentives);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Fetch a single incentive by ID
 * @param {Object} req - Express request object, containing the id of the incentive in req.params
 * @param {Object} res - Express response object
 */
export const getIncentiveById = async (req, res) => {
	try {
		const incentive = await Incentive.findById(req.params.id);
		if (incentive) {
			res.json(incentive);
		} else {
			res.status(404).json({ message: "Incentive not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Start an incentive for a user
 * @param {Object} req - Express request object, containing the id of the incentive in req.body
 * @param {Object} res - Express response object
 */
export const startIncentive = async (req, res) => {
	const { incentiveId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (user.incentives.some((e) => e.incentiveId.toString() === incentiveId)) {
			return res.status(400).json({ message: "Incentive already started" });
		}

		user.incentives.push({ incentiveId });
		await user.save();

		res.status(200).json({ message: "Incentive started" });
	} catch (error) {
		console.error("Error starting Incentive:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Abandon an incentive for a user
 * @param {Object} req - Express request object, containing the id of the incentive in req.body
 * @param {Object} res - Express response object
 */
export const abandonIncentive = async (req, res) => {
	const { incentiveId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		user.incentives = user.incentives.filter(
			(e) => e.incentiveId.toString() !== incentiveId
		);
		await user.save();

		res.status(200).json({ message: "Incentive abandoned" });
	} catch (error) {
		console.error("Error abandoning incentive:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Update progress for an incentive of a user
 * @param {Object} req - Express request object, containing the id and progress of the incentive in req.body
 * @param {Object} res - Express response object
 */
export const updateProgress = async (req, res) => {
	const { incentiveId, progress } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		const incentive = await Incentive.findById(incentiveId);

		const userIncentive = user.incentives.find(
			(e) => e.incentiveId.toString() === incentiveId
		);

		if (!userIncentive) {
			return res.status(404).json({ message: "Incentive not found" });
		}

		userIncentive.progress += progress;
		if (userIncentive.progress >= incentive.goal) {
			userIncentive.completed = true;
		}
		await user.save();

		res.status(200).json({
			message: "Progress updated",
			completed: userIncentive.completed,
		});
	} catch (error) {
		console.error("Error updating progress:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Function to create a new incentive
 * @param {Object} req - The request object containing the data for creating an incentive
 * @param {String} req.body.title - Title of the incentive
 * @param {String} req.body.description - Description of the incentive
 * @param {String} req.body.type - Type of the incentive
 * @param {Date} req.body.startDate - Start date of the incentive
 * @param {Date} req.body.endDate - End date of the incentive
 * @param {Object} req.body.completionCriteria - Completion criteria for the incentive
 * @param {String} req.body.client - Client ID for the incentive
 *
 * @returns {Object} The created incentive object with status code 201 if successful, else returns a server error with status code 500
 */
export const createIncentive = async (req, res) => {
	try {
		const {
			title,
			description,
			type,
			startDate,
			endDate,
			completionCriteria,
			client,
		} = req.body;
		const incentive = new Incentive({
			title,
			description,
			type,
			startDate,
			endDate,
			completionCriteria,
			client,
		});
		const createdIncentive = await incentive.save();
		res.status(201).json(createdIncentive);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Function to update an incentive
 * @param {Object} req - The request object containing the data for updating an incentive and its id
 * @param {String} req.body.title - Title of the incentive
 * @param {String} req.body.description - Description of the incentive
 * @param {Date} req.body.startDate - Start date of the incentive
 * @param {Date} req.body.endDate - End date of the incentive
 *
 * @returns {Object} The updated incentive object with status code 200 if successful, else returns an error message with status code 500
 */
export const updateIncentive = async (req, res) => {
	const { title, description, startDate, endDate } = req.body;

	try {
		const incentive = await Incentive.findById(req.params.id);
		if (!incentive) {
			return res.status(404).json({ message: "Incentive not found" });
		}

		incentive.title = title;
		incentive.description = description;
		incentive.startDate = startDate;
		incentive.endDate = endDate;

		const updateIncentive = await incentive.save();
		res.json(updateIncentive);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Function to delete an incentive by id
 * @param {Object} req - The request object containing the id of the incentive to be deleted
 *
 * @returns {Object} A success message with status code 200 if successful, else returns an error message with status code 500
 */
export const deleteIncentive = async (req, res) => {
	try {
		const incentive = await Incentive.findByIdAndDelete(req.params.id);
		if (incentive) {
			res.json({ message: "Incentive deleted" });
		} else {
			res.status(404).json({ message: "Incentive not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Function to get all incentives for a specific client
 * @param {Object} req - The request object containing the id of the client
 *
 * @returns {Array<Incentive>} An array of incentives if successful, else returns an error message with status code 500
 */
export const getIncentivesByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await Incentive.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching incentives by client:", error);
		res
			.status(500)
			.json({ message: "Error fetching incentives", error: error.message });
	}
};
