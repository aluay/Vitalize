import mongoose from "mongoose";

const challengeSchema = mongoose.Schema(
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
			enum: ["step", "minute", "calorie", "other"],
			required: true,
		},
		participantsList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "inactive",
			required: true,
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
		tags: [
			{
				type: String,
			},
		],
		visibility: {
			type: String,
			enum: ["visible", "hidden"],
			default: "visible",
			required: true,
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

const Challenge = mongoose.model("Challenge", challengeSchema);

export default Challenge;
