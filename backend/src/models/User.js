import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * A schema definition for a user.
 */
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
		},
		testUser: {
			type: Boolean,
			default: false,
		},
		dateOfBirth: {
			type: Date,
		},
		phoneNumber: {
			type: String,
		},
		address: {
			street: String,
			city: String,
			state: String,
			postalCode: String,
			country: String,
		},
		profilePicture: {
			type: String, // URL to the profile picture
		},
		preferences: {
			notifications: {
				type: Boolean,
				default: true,
			},
			darkMode: {
				type: Boolean,
				default: false,
			},
			language: {
				type: String,
				default: "en", // Default language
			},
		},
		bio: {
			type: String, // A short bio for the user
		},
		socialLinks: {
			facebook: String,
			twitter: String,
			instagram: String,
			linkedIn: String,
		},
		challenges: [
			{
				challengeId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Challenge",
				},
				status: {
					type: String,
					enum: ["active", "completed", "abandoned"],
					default: "active",
				},
				startedAt: {
					type: Date,
					default: Date.now,
				},
				endedAt: {
					type: Date,
				},
				progress: {
					type: Number,
					default: 0,
				},
				completed: {
					type: Boolean,
					default: false,
				},
			},
		],
		incentives: [
			{
				incentiveId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Incentive",
				},
				status: {
					type: String,
					enum: ["active", "completed"],
					default: "active",
				},
				startedAt: {
					type: Date,
					default: Date.now,
				},
				endedAt: {
					type: Date,
				},
				progress: {
					type: Number,
					default: 0,
				},
				completed: {
					type: Boolean,
					default: false,
				},
			},
		],
		routines: [
			{
				routineId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Routine",
				},
				startedAt: {
					type: Date,
					default: Date.now,
				},
				endedAt: {
					type: Date,
				},
				progress: {
					type: Number,
					default: 0,
				},
				completed: {
					type: Boolean,
					default: false,
				},
			},
		],
		expeditions: [
			{
				expeditionId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Expedition",
				},
				startedAt: {
					type: Date,
					default: Date.now,
				},
				endedAt: {
					type: Date,
				},
				progress: {
					type: Number,
					default: 0,
				},
				completed: {
					type: Boolean,
					default: false,
				},
			},
		],
		achievements: [
			{
				achievementId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Achievement",
				},
				achievedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		activityLogs: [
			{
				action: {
					type: String,
					enum: [
						"login",
						"logout",
						"challengeStarted",
						"challengeCompleted",
						"routineStarted",
						"routineCompleted",
						"expeditionStarted",
						"expeditionCompleted",
						"incentiveClaimed",
					],
					required: true,
				},
				timestamp: {
					type: Date,
					default: Date.now,
				},
				details: {
					type: String, // Additional details about the action
				},
			},
		],
		accountStatus: {
			type: String,
			enum: ["active", "suspended", "deactivated"],
			default: "active",
		},
		lastLogin: {
			type: Date,
		},
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		settings: {
			privacy: {
				profileVisibility: {
					type: String,
					enum: ["public", "friends", "private"],
					default: "friends",
				},
				searchVisibility: {
					type: Boolean,
					default: true,
				},
			},
			emailPreferences: {
				newsletter: {
					type: Boolean,
					default: true,
				},
				promotionalEmails: {
					type: Boolean,
					default: true,
				},
			},
		},
		security: {
			twoFactorAuthEnabled: {
				type: Boolean,
				default: false,
			},
			loginAttempts: {
				type: Number,
				default: 0,
			},
			lockUntil: {
				type: Date,
			},
		},
		client: {
			type: String,
			// type: mongoose.Schema.Types.ObjectId,
			// ref: "Client",
		},
	},
	{
		timestamps: true,
	}
);

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
