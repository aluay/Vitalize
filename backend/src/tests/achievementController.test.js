import request from "supertest";
import express from "express";
import {
	getAchievements,
	getAchievementById,
	awardAchievement,
} from "../controllers/achievementController";
import Achievement from "../models/Achievement";
import User from "../models/User";

jest.mock("../models/Achievement");
jest.mock("../models/User");

const app = express();
app.use(express.json());
app.get("/achievements", getAchievements);
app.get("/achievements/:id", getAchievementById);
app.post(
	"/award-achievement",
	(req, res, next) => {
		req.user = { _id: "user123" };
		next();
	},
	awardAchievement
);
// Mock console.error to suppress error output during testing
console.error = jest.fn();

describe("GET /achievements", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return all achievements", async () => {
		const mockAchievements = [
			{ _id: "1", name: "Achievement 1" },
			{ _id: "2", name: "Achievement 2" },
		];

		Achievement.find.mockResolvedValue(mockAchievements);

		const response = await request(app).get("/achievements");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockAchievements);
	});

	it("should handle errors gracefully", async () => {
		Achievement.find.mockRejectedValue(new Error("Database error"));

		const response = await request(app).get("/achievements");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ message: "Server error" });
		expect(console.error).toHaveBeenCalledWith(
			"Error fetching achievements:",
			expect.any(Error)
		);
	});
});

describe("GET /achievements/:id", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return the achievement if found", async () => {
		const mockAchievement = { _id: "1", name: "Achievement 1" };

		Achievement.findById.mockResolvedValue(mockAchievement);

		const response = await request(app).get("/achievements/1");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockAchievement);
	});

	it("should return 404 if achievement not found", async () => {
		Achievement.findById.mockResolvedValue(null);

		const response = await request(app).get("/achievements/1");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Achievement not found" });
	});

	it("should handle errors gracefully", async () => {
		Achievement.findById.mockRejectedValue(new Error("Database error"));

		const response = await request(app).get("/achievements/1");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ message: "Server error" });
		expect(console.error).toHaveBeenCalledWith(
			"Error fetching achievement by ID:",
			expect.any(Error)
		);
	});
});

describe("POST /award-achievement", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should award achievement if not already awarded", async () => {
		const mockUser = {
			_id: "user123",
			achievements: [],
			save: jest.fn().mockResolvedValue(true),
		};

		User.findById.mockResolvedValue(mockUser);

		const response = await request(app)
			.post("/award-achievement")
			.send({ achievementId: "achievement123" });

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: "Achievement awarded" });
		expect(mockUser.achievements).toEqual([
			{ achievementId: "achievement123" },
		]);
		expect(mockUser.save).toHaveBeenCalled();
	});

	it("should not award achievement if already awarded", async () => {
		const mockUser = {
			_id: "user123",
			achievements: [{ achievementId: "achievement123" }],
			save: jest.fn(),
		};

		User.findById.mockResolvedValue(mockUser);

		const response = await request(app)
			.post("/award-achievement")
			.send({ achievementId: "achievement123" });

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Achievement already awarded" });
		expect(mockUser.save).not.toHaveBeenCalled();
	});

	it("should handle errors gracefully", async () => {
		User.findById.mockRejectedValue(new Error("Database error"));

		const response = await request(app)
			.post("/award-achievement")
			.send({ achievementId: "achievement123" });

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ message: "Server error" });
		expect(console.error).toHaveBeenCalledWith(
			"Error awarding achievement:",
			expect.any(Error)
		);
	});
});
