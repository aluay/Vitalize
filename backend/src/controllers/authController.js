import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) for the given user ID.
 *
 * @param {String} id The user ID to generate the token for
 * @returns {String} The generated JWT token
 */
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

/**
 * Creates a new user in the database with the given username, email, password, first name, last name, gender, date of birth, and phone number.
 *
 * @param {Object} req The HTTP request object
 * @param {Object} res The HTTP response object
 */
export const registerUser = async (req, res) => {
	const {
		username,
		email,
		password,
		firstName,
		lastName,
		gender,
		dateOfBirth,
		phoneNumber,
	} = req.body;

	try {
		// Check if the user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Create a new user
		const user = await User.create({
			username,
			email,
			password,
			firstName,
			lastName,
			gender,
			dateOfBirth,
			phoneNumber,
		});

		// Respond with the user's data and JWT token
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			gender: user.gender,
			dateOfBirth: user.dateOfBirth,
			phoneNumber: user.phoneNumber,
			token: generateToken(user._id),
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Authenticates the given username and password, and returns a JWT token if successful.
 *
 * @param {Object} req The HTTP request object
 * @param {Object} res The HTTP response object
 */
export const authUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find the user by username
		const user = await User.findOne({ username });

		// Check if the user exists and the password matches
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				username: user.username,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ message: "Invalid username or password" });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};
