import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Text,
	VStack,
	// StackDivider,
	// Link,
	Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
	const { isAuthenticated, logout } = useAuth();
	const [startedChallenges, setStartedChallenges] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			const fetchStartedChallenges = async () => {
				const response = await fetch(
					"http://localhost:5000/api/users/challenges",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				const data = await response.json();
				setStartedChallenges(data);
			};

			fetchStartedChallenges();
		}
	}, [isAuthenticated]);

	const handleLogout = () => {
		logout(navigate);
	};

	return (
		<Box maxW="md" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack spacing={4} align="stretch">
				<Heading>Dashboard</Heading>
				<Text>Welcome to your dashboard!</Text>
				<Heading size="md">Started Challenges</Heading>
				{startedChallenges.map((challenge) => (
					<Box
						key={challenge.challengeId}
						p={4}
						borderWidth="1px"
						borderRadius="md">
						<Heading>{challenge.title}</Heading>
						<Text>
							Started At: {new Date(challenge.startedAt).toLocaleString()}
						</Text>
						<Text>Progress: {challenge.progress}%</Text>
					</Box>
				))}
				<Button colorScheme="blue" onClick={handleLogout}>
					Logout
				</Button>
			</VStack>
		</Box>
	);
};

export default DashboardPage;
