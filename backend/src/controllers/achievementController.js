import User from "../models/User.js";
import Achievement from "../models/Achievement.js";

/**
 * Fetch all achievements
 * @function getAchievements
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Array.<Achievement>} Array of achievements
 */
export const getAchievements = async (req, res) => {
	try {
		const achievements = await Achievement.find({});
		res.json(achievements);
	} catch (error) {
		console.error("Error fetching achievements:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Fetch a single achievement by ID
 * @function getAchievementById
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Achievement} Achievement object
 */
export const getAchievementById = async (req, res) => {
	try {
		const achievement = await Achievement.findById(req.params.id);
		if (achievement) {
			res.json(achievement);
		} else {
			res.status(404).json({ message: "Achievement not found" });
		}
	} catch (error) {
		console.error("Error fetching achievement by ID:", error);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * Award an achievement to a user
 * @function awardAchievement
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Array.<User>} Array of users
 */
export const awardAchievement = async (req, res) => {
	const { achievementId } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);

		if (
			user.achievements.some(
				(a) => a.achievementId.toString() === achievementId
			)
		) {
			return res.status(400).json({ message: "Achievement already awarded" });
		}

		user.achievements.push({ achievementId });
		await user.save();

		res.status(200).json({ message: "Achievement awarded" });
	} catch (error) {
		console.error("Error awarding achievement:", error);
		res.status(500).json({ message: "Server error" });
	}
};
