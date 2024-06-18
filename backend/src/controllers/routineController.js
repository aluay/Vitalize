import User from "../models/User.js";
import Routine from "../models/Routine.js";

// Fetch all routines
export const getRoutines = async (req, res) => {
	try {
		const routines = await Routine.find({});
		res.json(routines);
	} catch (error) {
		console.error("Error fetching routines:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Fetch a single routine by ID
export const getRoutineById = async (req, res) => {
	try {
		const routine = await Routine.findById(req.params.id);
		if (routine) {
			res.json(routine);
		} else {
			res.status(404).json({ message: "Routine not found" });
		}
	} catch (error) {
		console.error("Error fetching routine by ID:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Start a routine
export const startRoutine = async (req, res) => {
	const { routineId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (user.routines.some((r) => r.routineId.toString() === routineId)) {
			return res.status(400).json({ message: "Routine already started" });
		}

		user.routines.push({ routineId });
		await user.save();

		res.status(200).json({ message: "Routine started" });
	} catch (error) {
		console.error("Error starting routine:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Abandon a routine
export const abandonRoutine = async (req, res) => {
	const { routineId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		user.routines = user.routines.filter(
			(r) => r.routineId.toString() !== routineId
		);
		await user.save();

		res.status(200).json({ message: "Routine abandoned" });
	} catch (error) {
		console.error("Error abandoning routine:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update progress
export const updateProgress = async (req, res) => {
	const { routineId, progress } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		const routine = await Routine.findById(routineId);

		const userRoutine = user.routines.find(
			(r) => r.routineId.toString() === routineId
		);

		if (!userRoutine) {
			return res.status(404).json({ message: "Routine not found" });
		}

		userRoutine.progress += progress;
		if (userRoutine.progress >= routine.goal) {
			userRoutine.completed = true;
		}
		await user.save();

		res
			.status(200)
			.json({ message: "Progress updated", completed: userRoutine.completed });
	} catch (error) {
		console.error("Error updating progress:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Create a new routine
export const createRoutine = async (req, res) => {
	try {
		const {
			title,
			description,
			rules,
			status,
			startDate,
			endDate,
			reward,
			difficulty,
			goal,
			completionCriteria,
			client,
		} = req.body;
		const routine = new Routine({
			title,
			description,
			rules,
			status,
			startDate,
			endDate,
			reward,
			difficulty,
			goal,
			completionCriteria,
			client,
		});
		const createdRoutine = await routine.save();
		res.status(201).json(createdRoutine);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

// Update a routine
export const updateRoutine = async (req, res) => {
	const { id } = req.params;
	const {
		title,
		description,
		rules,
		status,
		startDate,
		endDate,
		reward,
		difficulty,
		goal,
		completionCriteria,
	} = req.body;

	try {
		const routine = await Routine.findById(id);
		if (!routine) {
			return res.status(404).json({ message: "Routine not found" });
		}

		routine.title = title;
		routine.description = description;
		routine.rules = rules;
		routine.status = status;
		routine.startDate = startDate;
		routine.endDate = endDate;
		routine.reward = reward;
		routine.difficulty = difficulty;
		routine.goal = goal;
		routine.completionCriteria = completionCriteria;

		const updatedRoutine = await routine.save();
		res.json(updatedRoutine);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Delete a routine
export const deleteRoutine = async (req, res) => {
	const { id } = req.params;

	try {
		const routine = await Routine.findById(id);
		if (!routine) {
			return res.status(404).json({ message: "Routine not found" });
		}

		await routine.deleteOne();
		res.json({ message: "Routine removed" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get routines by client
export const getRoutinesByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await Routine.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching routines by client:", error);
		res
			.status(500)
			.json({ message: "Error fetching routines", error: error.message });
	}
};
