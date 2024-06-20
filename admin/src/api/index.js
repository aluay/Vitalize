import axios from "axios";

/**
 * This is an API entry point for accessing the various endpoints in the backend.
 * @constant {string} API_URL The base URL of the API.
 */
const API_URL = "http://localhost:5000/api";

/**
 * Fetches the authentication headers from local storage and returns them as an object.
 * @returns {object} An object containing the authorization header with a bearer token.
 */
const getAuthHeaders = () => {
	const token = localStorage.getItem("token");
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

/**
 * Logs in a user and returns the user data.
 * @param {object} credentials The login credentials (username, email, or phone number) and password for authentication.
 * @returns {Promise<object>} A promise that resolves to an object containing the user's data.
 */
export const loginUser = async (credentials) => {
	const response = await axios.post(`${API_URL}/auth/login`, credentials);
	return response.data;
};

/**
 * Gets a user by their ID and returns their data.
 * @param {number} userId The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to an object containing the user's data.
 */
export const getUserById = async (userId) => {
	try {
		const response = await axios.get(
			`${API_URL}/users/${userId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching user data:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Updates a user's data and returns the updated data.
 * @param {number} userId The ID of the user to update.
 * @param {object} userData An object containing the new data for the user.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated user's data.
 */
export const updateUser = async (userId, userData) => {
	try {
		const response = await axios.put(
			`${API_URL}/users/${userId}`,
			userData,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error updating user:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches all challenges from the API and returns them as an array.
 * @returns {Promise<array>} A promise that resolves to an array of challenge objects.
 */
export const getChallenges = async () => {
	const response = await axios.get(`${API_URL}/challenges`, getAuthHeaders());
	return response.data;
};

/**
 * Fetches a challenge by its ID and returns it as an object.
 * @param {number} id The ID of the challenge to fetch.
 * @returns {Promise<object>} A promise that resolves to an object containing the challenge's data.
 */
export const getChallengeById = async (id) => {
	const response = await axios.get(
		`${API_URL}/challenges/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Creates a new challenge and returns it as an object.
 * @param {object} challenge An object containing the challenge's data.
 * @returns {Promise<object>} A promise that resolves to an object containing the new challenge's data.
 */
export const createChallenge = async (challenge) => {
	const response = await axios.post(
		`${API_URL}/challenges`,
		challenge,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Updates a challenge and returns the updated data.
 * @param {number} id The ID of the challenge to update.
 * @param {object} challenge An object containing the new data for the challenge.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated challenge's data.
 */
export const updateChallenge = async (id, challenge) => {
	const response = await axios.put(
		`${API_URL}/challenges/${id}`,
		challenge,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Deletes a challenge and returns the deleted data.
 * @param {number} id The ID of the challenge to delete.
 * @returns {Promise<object>} A promise that resolves to an object containing the deleted challenge's data.
 */
export const deleteChallenge = async (id) => {
	const response = await axios.delete(
		`${API_URL}/challenges/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Fetches all routines from the API and returns them as an array.
 * @returns {Promise<array>} A promise that resolves to an array of routine objects.
 */
export const getRoutines = async () => {
	const response = await axios.get(`${API_URL}/routines`, getAuthHeaders());
	return response.data;
};

/**
 * Fetches a routine by its ID and returns it as an object.
 * @param {number} id The ID of the routine to fetch.
 * @returns {Promise<object>} A promise that resolves to an object containing the routine's data.
 */
export const getRoutineById = async (id) => {
	const response = await axios.get(
		`${API_URL}/routines/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Creates a new routine and returns it as an object.
 * @param {object} routine An object containing the routine's data.
 * @returns {Promise<object>} A promise that resolves to an object containing the new routine's data.
 */
export const createRoutine = async (routine) => {
	const response = await axios.post(
		`${API_URL}/routines`,
		routine,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Updates a routine and returns the updated data.
 * @param {number} id The ID of the routine to update.
 * @param {object} routine An object containing the new data for the routine.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated routine's data.
 */
export const updateRoutine = async (id, routine) => {
	const response = await axios.put(
		`${API_URL}/routines/${id}`,
		routine,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Deletes a routine and returns the deleted data.
 * @param {number} id The ID of the routine to delete.
 * @returns {Promise<object>} A promise that resolves to an object containing the deleted routine's data.
 */
export const deleteRoutine = async (id) => {
	const response = await axios.delete(
		`${API_URL}/routines/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Fetches all expeditions from the API and returns them as an array.
 * @returns {Promise<array>} A promise that resolves to an array of expedition objects.
 */
export const getExpeditions = async () => {
	const response = await axios.get(`${API_URL}/expeditions`, getAuthHeaders());
	return response.data;
};

/**
 * Fetches a expedition by its ID and returns it as an object.
 * @param {number} id The ID of the expedition to fetch.
 * @returns {Promise<object>} A promise that resolves to an object containing the expedition's data.
 */
export const getExpeditionById = async (id) => {
	const response = await axios.get(
		`${API_URL}/expeditions/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Creates a new expedition and returns it as an object.
 * @param {object} expedition An object containing the expedition's data.
 * @returns {Promise<object>} A promise that resolves to an object containing the new expedition's data.
 */
export const createExpedition = async (expedition) => {
	const response = await axios.post(
		`${API_URL}/expeditions`,
		expedition,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Updates a expedition and returns the updated data.
 * @param {number} id The ID of the expedition to update.
 * @param {object} expedition An object containing the new data for the expedition.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated expedition's data.
 */
export const updateExpedition = async (id, expedition) => {
	const response = await axios.put(
		`${API_URL}/expeditions/${id}`,
		expedition,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Deletes a expedition and returns the deleted data.
 * @param {number} id The ID of the expedition to delete.
 * @returns {Promise<object>} A promise that resolves to an object containing the deleted expedition's data.
 */
export const deleteExpedition = async (id) => {
	const response = await axios.delete(
		`${API_URL}/expeditions/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Fetches all incentives from the API and returns them as an array.
 * @returns {Promise<array>} A promise that resolves to an array of incentive objects.
 */
export const getIncentives = async () => {
	const response = await axios.get(`${API_URL}/incentives`, getAuthHeaders());
	return response.data;
};

/**
 * Fetches a incentive by its ID and returns it as an object.
 * @param {number} id The ID of the incentive to fetch.
 * @returns {Promise<object>} A promise that resolves to an object containing the incentive's data.
 */
export const getIncentiveById = async (id) => {
	const response = await axios.get(
		`${API_URL}/incentives/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Creates a new incentive and returns it as an object.
 * @param {object} incentive An object containing the incentive's data.
 * @returns {Promise<object>} A promise that resolves to an object containing the new incentive's data.
 */
export const createIncentive = async (incentive) => {
	const response = await axios.post(
		`${API_URL}/incentives`,
		incentive,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Updates a incentive and returns the updated data.
 * @param {number} id The ID of the incentive to update.
 * @param {object} incentive An object containing the new data for the incentive.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated incentive's data.
 */
export const updateIncentive = async (id, incentive) => {
	const response = await axios.put(
		`${API_URL}/incentives/${id}`,
		incentive,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Deletes a incentive and returns the deleted data.
 * @param {number} id The ID of the incentive to delete.
 * @returns {Promise<object>} A promise that resolves to an object containing the deleted incentive's data.
 */
export const deleteIncentive = async (id) => {
	const response = await axios.delete(
		`${API_URL}/incentives/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Fetches all clients from the API and returns them as an array.
 * @returns {Promise<array>} A promise that resolves to an array of client objects.
 */
export const getClients = async () => {
	const response = await axios.get(`${API_URL}/clients`, getAuthHeaders());
	return response.data;
};

/**
 * Fetches a client by its ID and returns it as an object.
 * @param {number} clientId The ID of the client to fetch.
 * @returns {Promise<object>} A promise that resolves to an object containing the client's data.
 */
export const getClientById = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/clients/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching client data:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Updates a client's data and returns the updated data.
 * @param {number} clientId The ID of the client to update.
 * @param {object} clientData An object containing the new data for the client.
 * @returns {Promise<object>} A promise that resolves to an object containing the updated client's data.
 */
export const updateClient = async (clientId, clientData) => {
	try {
		const response = await axios.put(
			`${API_URL}/clients/${clientId}`,
			clientData,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error updating client:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Deletes a client and returns the deleted data.
 * @param {number} id The ID of the client to delete.
 * @returns {Promise<object>} A promise that resolves to an object containing the deleted client's data.
 */
export const deleteClient = async (id) => {
	const response = await axios.delete(
		`${API_URL}/clients/${id}`,
		getAuthHeaders()
	);
	return response.data;
};

/**
 * Fetches all users associated with a client by its ID and returns them as an array.
 * @param {number} clientId The ID of the client to fetch users for.
 * @returns {Promise<array>} A promise that resolves to an array of user objects.
 */
export const getUsersByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/users/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching users by client:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches all challenges associated with a client by its ID and returns them as an array.
 * @param {number} clientId The ID of the client to fetch challenges for.
 * @returns {Promise<array>} A promise that resolves to an array of challenge objects.
 */
export const getChallengesByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/challenges/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching challenges by client:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches all routines associated with a client by its ID and returns them as an array.
 * @param {number} clientId The ID of the client to fetch routines for.
 * @returns {Promise<array>} A promise that resolves to an array of routine objects.
 */
export const getRoutinesByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/routines/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching routines by client:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches all expeditions associated with a client by its ID and returns them as an array.
 * @param {number} clientId The ID of the client to fetch expeditions for.
 * @returns {Promise<array>} A promise that resolves to an array of expedition objects.
 */
export const getExpeditionsByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/expeditions/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching expeditions by client:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches all incentives associated with a client by its ID and returns them as an array.
 * @param {number} clientId The ID of the client to fetch incentives for.
 * @returns {Promise<array>} A promise that resolves to an array of incentive objects.
 */
export const getIncentivesByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/incentives/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching incentives by client:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches a message by ID.
 * @param {string} messageId - The ID of the message to fetch.
 * @returns {Promise<Object>} - The message data.
 * @throws {Error} - If an error occurs while fetching the message.
 */
export const getMessageById = async (messageId) => {
	try {
		const response = await axios.get(
			`${API_URL}/messages/${messageId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching message:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Creates a new message.
 * @param {Object} messageData - The data of the message to create.
 * @returns {Promise<Object>} - The created message data.
 * @throws {Error} - If an error occurs while creating the message.
 */
export const createMessage = async (messageData) => {
	try {
		const response = await axios.post(
			`${API_URL}/messages`,
			messageData,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error creating message:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Updates a message by ID.
 * @param {string} messageId - The ID of the message to update.
 * @param {Object} messageData - The updated message data.
 * @returns {Promise<Object>} - The updated message data.
 * @throws {Error} - If an error occurs while updating the message.
 */
export const updateMessage = async (messageId, messageData) => {
	try {
		const response = await axios.put(
			`${API_URL}/messages/${messageId}`,
			messageData,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error updating message:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches messages by client ID.
 * @param {string} clientId - The ID of the client to fetch messages for.
 * @returns {Promise<Array>} - An array of messages for the client.
 * @throws {Error} - If an error occurs while fetching the messages.
 */
export const getMessagesByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/messages/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching messages:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Deletes a message by ID.
 * @param {string} messageId - The ID of the message to delete.
 * @returns {Promise<Object>} - The response data.
 * @throws {Error} - If an error occurs while deleting the message.
 */
export const deleteMessage = async (messageId) => {
	try {
		const response = await axios.delete(
			`${API_URL}/messages/${messageId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error deleting message:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Fetches all rules.
 * @returns {Promise<Array>} - An array of rules.
 * @throws {Error} - If an error occurs while fetching the rules.
 */
export const getRulesByClient = async (clientId) => {
	try {
		const response = await axios.get(
			`${API_URL}/rules/client/${clientId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error fetching rules:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Creates a new rule.
 * @param {Object} ruleData - The data of the rule to create.
 * @returns {Promise<Object>} - The created rule data.
 * @throws {Error} - If an error occurs while creating the rule.
 */
export const createRule = async (ruleData) => {
	try {
		const response = await axios.post(
			`${API_URL}/rules`,
			ruleData,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error creating rule:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Updates a rule by ID.
 * @param {string} ruleId - The ID of the rule to update.
 * @param {Object} ruleData - The updated rule data.
 * @returns {Promise<Object>} - The updated rule data.
 * @throws {Error} - If an error occurs while updating the rule.
 */
export const updateRule = async (ruleId, ruleData) => {
	try {
		const response = await axios.put(
			`${API_URL}/rules/${ruleId}`,
			ruleData,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error updating rule:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};

/**
 * Deletes a rule by ID.
 * @param {string} ruleId - The ID of the rule to delete.
 * @returns {Promise<Object>} - The response data.
 * @throws {Error} - If an error occurs while deleting the rule.
 */
export const deleteRule = async (ruleId) => {
	try {
		const response = await axios.delete(
			`${API_URL}/rules/${ruleId}`,
			getAuthHeaders()
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error deleting rule:",
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};
