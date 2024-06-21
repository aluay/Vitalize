import mongoose from "mongoose";

/**
 * A schema definition for a client.
 */
const expeditionSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		teams: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
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

const Expedition = mongoose.model("Expedition", expeditionSchema);

export default Expedition;
