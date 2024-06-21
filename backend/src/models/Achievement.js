import mongoose from "mongoose";

/**
 * Schema for the 'Achievement' document in MongoDB.
 * Defines the structure of documents in the 'achievements' collection and specifies their properties, data types
 * and whether they are required or not.
 */
const achievementSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		criteria: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
