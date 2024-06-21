import Rule from "../models/Rule.js";

/**
 * Fetch all the rules from database
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Promise<void>}
 */
export const getRules = async (req, res) => {
	try {
		const rules = await Rule.find();
		res.status(200).json(rules);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching rules", error: error.message });
	}
};

/**
 * Fetch all the rules for a specific client from database
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Promise<void>}
 */
export const getRulesByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await Rule.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching rules by client:", error);
		res
			.status(500)
			.json({ message: "Error fetching rules", error: error.message });
	}
};

/**
 * Create a new rule in the database
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Promise<void>}
 */
export const createRule = async (req, res) => {
	const { entity, attribute, operator, value, logicalConditions, client } =
		req.body;
	console.log(client);
	try {
		const rule = new Rule({
			entity,
			attribute,
			operator,
			value,
			logicalConditions,
			client,
		});
		await rule.save();
		res.status(201).json(rule);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating rule", error: error.message });
	}
};

/**
 * Update a rule in the database
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Promise<void>}
 */
export const updateRule = async (req, res) => {
	const { ruleId } = req.params;
	try {
		const rule = await Rule.findByIdAndUpdate(ruleId, req.body, { new: true });
		if (!rule) {
			return res.status(404).json({ message: "Rule not found" });
		}
		res.status(200).json(rule);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating rule", error: error.message });
	}
};

/**
 * Delete a rule from the database
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Promise<void>}
 */
export const deleteRule = async (req, res) => {
	const { ruleId } = req.params;
	try {
		const rule = await Rule.findByIdAndDelete(ruleId);
		if (!rule) {
			return res.status(404).json({ message: "Rule not found" });
		}
		res.status(200).json({ message: "Rule deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting rule", error: error.message });
	}
};
