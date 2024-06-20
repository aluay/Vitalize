import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
	entity: { type: String, required: true },
	attribute: { type: String, required: true },
	operator: { type: String, required: true },
	value: { type: mongoose.Schema.Types.Mixed, required: true },
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: true,
	},
	logicalConditions: [
		{
			operator: { type: String, enum: ["AND", "OR", "NOT"], required: true },
			rules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rule" }],
		},
	],
});

const Rule = mongoose.model("Rule", ruleSchema);
export default Rule;
