import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Text,
	VStack,
	StackDivider,
	Link,
	Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ChallengesPage = () => {
	const { isAuthenticated } = useAuth();
	const [challenges, setChallenges] = useState([]);
	const [startedChallenges, setStartedChallenges] = useState([]);
	const [completedChallenges, setCompletedChallenges] = useState([]);

	useEffect(() => {
		const fetchChallenges = async () => {
			const response = await fetch("http://localhost:5000/api/challenges", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			const data = await response.json();
			setChallenges(data);
		};

		fetchChallenges();
	}, []);

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
				const started = data
					.filter((challenge) => !challenge.completed)
					.map((challenge) => challenge.challengeId);
				const completed = data
					.filter((challenge) => challenge.completed)
					.map((challenge) => challenge.challengeId);
				setStartedChallenges(started);
				setCompletedChallenges(completed);
			};

			fetchStartedChallenges();
		}
	}, [isAuthenticated]);

	const startChallenge = async (challengeId) => {
		const response = await fetch("http://localhost:5000/api/challenges/start", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ challengeId }),
		});

		if (response.ok) {
			setStartedChallenges([...startedChallenges, challengeId]);
		}
	};

	return (
		<Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack
				spacing={4}
				align="stretch"
				divider={<StackDivider borderColor="gray.200" />}>
				<Heading>Challenges</Heading>
				{challenges
					.filter((challenge) => !completedChallenges.includes(challenge._id))
					.map((challenge) => (
						<Box key={challenge._id} p={4} borderWidth="1px" borderRadius="md">
							<Link as={RouterLink} to={`/challenges/${challenge._id}`}>
								<Heading size="md">{challenge.title}</Heading>
								<Text>{challenge.description}</Text>
								{startedChallenges.includes(challenge._id.toString()) && (
									<Text>Started</Text>
								)}
							</Link>
							{!startedChallenges.includes(challenge._id.toString()) && (
								<Button
									colorScheme="blue"
									onClick={() => startChallenge(challenge._id)}>
									Start Challenge
								</Button>
							)}
						</Box>
					))}
			</VStack>
		</Box>
	);
};

export default ChallengesPage;
