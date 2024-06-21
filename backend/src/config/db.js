import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * A function to connect with MongoDB database.
 *
 * @async
 * @function connectDB
 */
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
