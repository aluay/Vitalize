import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Asynchronous function to protect routes from unauthorized access.
 * The function checks if a Bearer token exists in the request headers. If so, it attempts to decode and verify the JWT using the secret key.
 * After verification, it fetches user details associated with the provided JWT and attaches them to the 'req' object for later use.
 * The function then calls the next middleware or route handler. If there is an error during this process (e.g., token not found or invalid),
 * it responds with a 401 Unauthorized status code and a JSON message indicating that authorization was not successful.
 * @async
 * @function protect
 * @param {Object} req - Express request object, containing details about the incoming HTTP request.
 * @param {Object} res - Express response object, used to send back an HTTP response.
 * @param {Function} next - Function that signals that another middleware or route handler can be called.
 */
export const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (error) {
			console.error("Not authorized, token failed");
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	} else {
		res.status(401).json({ message: "Not authorized, no token" });
	}
};
