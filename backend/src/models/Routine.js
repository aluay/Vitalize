import mongoose from "mongoose";

/**
 * A schema definition for a routine.
 */
const routineSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		rules: {
			type: [String],
			required: true,
		},
		participants: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			enum: ["active", "completed", "abandoned", "inactive", "started"],
			default: "inactive",
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
			enum: ["star", "giftCard", "ticket"],
			required: true,
		},
		difficulty: {
			type: String,
			enum: ["easy", "medium", "hard"],
			required: true,
		},
		goal: {
			type: Number,
			required: true,
		},
		completionCriteria: {
			type: String,
			required: false,
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

const Routine = mongoose.model("Routine", routineSchema);

export default Routine;
