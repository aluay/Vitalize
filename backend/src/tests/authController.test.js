import { registerUser, authUser } from "../controllers/authController";
import User from "../models/User";
import jwt from "jsonwebtoken";

jest.mock("../models/User");
jest.mock("jsonwebtoken");

const mockRequest = (body = {}) => ({
	body,
});

const mockResponse = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe("registerUser", () => {
	it("should return 400 if user already exists", async () => {
		User.findOne.mockResolvedValue(true);
		const req = mockRequest({ body: { email: "test@example.com" } });
		const res = mockResponse();

		await registerUser(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
	});

	it("should create a new user and return user data and token", async () => {
		User.findOne.mockResolvedValue(null);
		User.create.mockResolvedValue({
			_id: "1",
			username: "testuser",
			email: "test@example.com",
			firstName: "Test",
			lastName: "User",
			gender: "Male",
			dateOfBirth: "1990-01-01",
			phoneNumber: "1234567890",
		});
		jwt.sign.mockImplementation(() => "mockedToken");

		const req = mockRequest({
			username: "testuser",
			email: "test@example.com",
			password: "password123",
			firstName: "Test",
			lastName: "User",
			gender: "Male",
			dateOfBirth: "1990-01-01",
			phoneNumber: "1234567890",
		});
		const res = mockResponse();

		await registerUser(req, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalled();
	});
});

describe("authUser", () => {
	it("should authenticate user and return token if credentials match", async () => {
		User.findOne.mockResolvedValue({
			_id: "1",
			username: "testuser",
			email: "test@example.com",
			matchPassword: jest.fn().mockResolvedValue(true),
		});
		jwt.sign.mockImplementation(() => "mockedToken");

		const req = mockRequest({ username: "testuser", password: "password123" });
		const res = mockResponse();

		await authUser(req, res);

		expect(res.json).toHaveBeenCalledWith({
			_id: "1",
			username: "testuser",
			email: "test@example.com",
			token: "mockedToken",
		});
	});

	it("should return 401 if credentials do not match", async () => {
		User.findOne.mockResolvedValue({
			matchPassword: jest.fn().mockResolvedValue(false),
		});

		const req = mockRequest({
			username: "testuser",
			password: "wrongpassword",
		});
		const res = mockResponse();

		await authUser(req, res);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid username or password",
		});
	});
});
