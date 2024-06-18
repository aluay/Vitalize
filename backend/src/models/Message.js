import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	sendStartDate: {
		type: Date,
		required: false,
	},
	sendEndDate: {
		type: Date,
		required: false,
	},
	activityType: {
		type: String,
		enum: ["Challenge", "Routine", "Incentive", "Expedition", "Other"],
		required: false,
	},
	activityId: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: "activityType",
		required: false,
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: false,
	},
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
