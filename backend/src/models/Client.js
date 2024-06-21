import mongoose from "mongoose";

/**
 * A Schema for the client entity.
 */
const clientSchema = mongoose.Schema({
	name: { type: String, required: true },
	domain: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
