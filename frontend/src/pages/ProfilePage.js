import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Heading,
	VStack,
	useToast,
} from "@chakra-ui/react";

const ProfilePage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		// Fetch user data here if needed
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		try {
			const response = await fetch("http://localhost:5000/api/users/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username, email, password }),
			});

			const text = await response.text();
			console.log("Response from server:", text);
			const data = JSON.parse(text);

			if (response.ok) {
				toast({
					title: "Profile updated",
					description: "Your profile has been updated successfully.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				navigate("/dashboard");
			} else {
				toast({
					title: "Update failed",
					description: data.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Update failed",
				description: "An unexpected error occurred.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const goToDashboard = () => {
		navigate("/dashboard");
	};

	return (
		<Box maxW="md" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack spacing={4}>
				<Heading>Update Profile</Heading>
				<form onSubmit={handleSubmit}>
					<VStack spacing={4}>
						<FormControl id="username">
							<FormLabel>Username</FormLabel>
							<Input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<Button type="submit" colorScheme="blue" width="full">
							Update Profile
						</Button>
					</VStack>
				</form>
				<Button mt={4} colorScheme="blue" onClick={goToDashboard}>
					Go to Dashboard
				</Button>
			</VStack>
		</Box>
	);
};

export default ProfilePage;
