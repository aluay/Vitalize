import Message from "../models/Message.js";
// import nodemailer from "nodemailer";
import Client from "../models/Client.js";

/**
 * Creates a new message and saves it to the database.
 * @param {Object} req - The request object containing the message details.
 * @param {Object} res - The response object for sending back the result of this function.
 */
export const createMessage = async (req, res) => {
	const {
		title,
		subject,
		body,
		client,
		sendStartDate,
		sendEndDate,
		// activityType,
		// activityId,
	} = req.body;
	try {
		const message = new Message({
			title,
			subject,
			body,
			client,
			sendStartDate,
			sendEndDate,
			// activityType,
			// activityId,
		});

		await message.save();
		res.status(201).json(message);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating message", error: error.message });
	}
};

/**
 * Retrieves all messages associated with a specific client from the database.
 * @param {Object} req - The request object containing the client ID.
 * @param {Object} res - The response object for sending back the result of this function.
 */
export const getMessagesByClient = async (req, res) => {
	const { clientId } = req.params;
	try {
		const users = await Message.find({ client: clientId });
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching messages by client:", error);
		res
			.status(500)
			.json({ message: "Error fetching messages", error: error.message });
	}
};

/**
 * Updates an existing message in the database with new details.
 * @param {Object} req - The request object containing the updated message details and the ID of the message to be updated.
 * @param {Object} res - The response object for sending back the result of this function.
 */
export const updateMessage = async (req, res) => {
	const { messageId } = req.params;

	try {
		const message = await Message.findByIdAndUpdate(messageId, req.body, {
			new: true,
		});
		if (!message) {
			return res.status(404).json({ message: "Message not found" });
		}
		res.status(200).json(message);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating message", error: error.message });
	}
};

/**
 * Deletes an existing message from the database.
 * @param {Object} req - The request object containing the ID of the message to be deleted.
 * @param {Object} res - The response object for sending back the result of this function.
 */
export const deleteMessage = async (req, res) => {
	const { messageId } = req.params;

	try {
		const message = await Message.findByIdAndDelete(messageId);
		if (!message) {
			return res.status(404).json({ message: "Message not found" });
		}
		res.status(200).json({ message: "Message deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting message", error: error.message });
	}
};

/**
 * Sends an email with a specific subject and body to a recipient's address.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The content of the email.
 */
const sendEmail = (email, subject, body) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject,
		text: body,
	};

	// transporter.sendMail(mailOptions, (error, info) => {
	// 	if (error) {
	// 		console.log("Error sending email:", error);
	// 	} else {
	// 		console.log("Email sent:", info.response);
	// 	}
	// });
};

/**
 * Retrieves all scheduled messages and sends them to their respective users.
 */
export const scheduleAndSendMessages = async () => {
	const now = new Date();

	const messages = await Message.find({
		sendStartDate: { $lte: now },
		sendEndDate: { $gte: now },
	});

	messages.forEach(async (message) => {
		const client = await Client.findById(message.clientId).populate("users");
		client.users.forEach((user) => {
			sendEmail(user.email, message.subject, message.body);
		});
	});
};
