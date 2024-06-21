import Client from "../models/Client.js";

/**
 * Get all clients
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const getClients = async (req, res) => {
	try {
		const clients = await Client.find({});
		res.json(clients);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

/**
 * Get a single client by id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const getClientById = async (req, res) => {
	const { clientId } = req.params;
	try {
		const client = await Client.findById(clientId);
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}
		res.status(200).json(client);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching client data", error: error.message });
	}
};

/**
 * Update a client by id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const updateClient = async (req, res) => {
	const { clientId } = req.params;
	const { name, domain } = req.body;
	try {
		const client = await Client.findById(clientId);
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}
		client.name = name;
		client.domain = domain;
		await client.save();
		res.status(200).json(client);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating client", error: error.message });
	}
};

/**
 * Delete a client by id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const deleteClient = async (req, res) => {
	try {
		const client = await Client.findById(req.params.id);
		if (!client) {
			return res.status(404).json({ message: "Client not found" });
		}

		await client.deleteOne();
		res.json({ message: "Client removed" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
