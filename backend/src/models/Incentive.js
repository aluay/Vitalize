import mongoose from "mongoose";

/**
 * A schema definition for an incentive.
 */
const incentiveSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["reward", "reminder", "message", "badge", "other"],
		},
		categories: [
			{
				type: String,
			},
		],
		participantsList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		status: {
			type: String,
			enum: ["active", "completed", "abandoned", "inactive", "started"],
			default: "inactive",
		},
		img: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		reward: {
			type: String,
		},
		difficulty: {
			type: String,
			enum: ["easy", "medium", "hard"],
		},
		completionCriteria: {
			type: String,
			required: false,
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Incentive = mongoose.model("Incentive", incentiveSchema);

export default Incentive;
