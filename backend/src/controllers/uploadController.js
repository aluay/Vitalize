import csv from "csv-parser";
import fs from "fs";
import Client from "../models/Client.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Helper function to parse CSV file
 * @param {string} filePath - The path of the CSV file.
 * @return {Promise<Array>} Promise object representing the array of data parsed from the CSV file.
 */
const parseCSV = (filePath) => {
	return new Promise((resolve, reject) => {
		const results = [];
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (data) => {
				// Normalize keys to lowercase
				const normalizedData = {};
				for (const key in data) {
					normalizedData[key.toLowerCase()] = data[key];
				}
				results.push(normalizedData);
			})
			.on("end", () => {
				resolve(results);
			})
			.on("error", (error) => {
				reject(error);
			});
	});
};

/**
 * Controller to upload clients
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
export const uploadClients = async (req, res) => {
	try {
		const clients = await parseCSV(req.file.path);

		// Validate and format client data
		const formattedClients = clients.map((client) => {
			if (!client.name || !client.domain) {
				throw new Error(`Invalid client data: ${JSON.stringify(client)}`);
			}
			return {
				name: client.name,
				domain: client.domain,
			};
		});

		const existingClients = await Client.find({
			domain: { $in: formattedClients.map((client) => client.domain) },
		});
		const existingDomains = new Set(
			existingClients.map((client) => client.domain)
		);

		const newClients = formattedClients.filter(
			(client) => !existingDomains.has(client.domain)
		);

		if (newClients.length > 0) {
			await Client.insertMany(newClients);
			res
				.status(201)
				.json({ message: "Clients uploaded successfully", newClients });
		} else {
			res.status(200).json({
				message: "No new clients to upload. All clients already exist.",
			});
		}
	} catch (error) {
		console.error("Error uploading clients:", error);
		res
			.status(500)
			.json({ message: "Error uploading clients", error: error.message });
	}
};

/**
 * Helper function to send email
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The body content of the email.
 */
const sendEmail = (email, subject, text) => {
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
		text,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error sending email:", error);
		} else {
			console.log("Email sent:", info.response);
		}
	});
};

/**
 * Helper function to generate unique username based on provided baseUsername.
 * @param {string} baseUsername - The base username for generating a unique one.
 * @return {Promise<string>} A Promise that resolves to the generated unique username.
 */
const generateUniqueUsername = async (baseUsername) => {
	let username = baseUsername;
	let exists = await User.findOne({ username });
	let counter = 1;

	while (exists) {
		username = `${baseUsername}${counter}`;
		exists = await User.findOne({ username });
		counter++;
	}

	return username;
};

/**
 * Controller to upload users from CSV file and create a new user for each in the system.
 * @param {Object} req - The request object containing the uploaded file and clientId in body.
 * @param {Object} res - The response object used to send back responses to the client.
 */
export const uploadUsers = async (req, res) => {
	try {
		const users = await parseCSV(req.file.path);
		const { clientId } = req.body; // Get the selected client ID from the request body

		// Validate the client ID
		const client = await Client.findById(clientId);
		if (!client) {
			return res.status(400).json({ message: "Invalid client ID" });
		}

		for (const user of users) {
			// Check if email already exists
			const emailExists = await User.findOne({ email: user.email });
			if (emailExists) {
				console.log(`Email already exists: ${user.email}`);
				continue;
			}

			// Generate a unique username
			const baseUsername = `${user.firstname}.${user.lastname}`;
			const username = await generateUniqueUsername(baseUsername);

			// Generate random password
			const password = crypto.randomBytes(8).toString("hex");
			const hashedPassword = await bcrypt.hash(password, 12);

			// Check if testUser field exists and set it accordingly
			const testUser = user.testuser && user.testuser.toLowerCase() === "true";

			await User.create({
				firstName: user.firstname,
				lastName: user.lastname,
				username,
				email: user.email,
				password: hashedPassword,
				client: client._id,
				testUser,
				client: clientId,
			});

			// Send email with the generated password
			// sendEmail(
			// 	user.email,
			// 	"Welcome to Our Platform",
			// 	`Hello ${user.firstname},\n\nYour account has been created. Here is your password: ${password}\n\nPlease log in and change your password as soon as possible.`
			// );
		}

		res.status(201).json({ message: "Users uploaded successfully" });
	} catch (error) {
		console.error("Error uploading users:", error);
		res
			.status(500)
			.json({ message: "Error uploading users", error: error.message });
	}
};
