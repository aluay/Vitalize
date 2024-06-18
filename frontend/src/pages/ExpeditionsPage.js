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

const ExpeditionsPage = () => {
	const { isAuthenticated } = useAuth();
	const [expeditions, setExpeditions] = useState([]);
	const [startedExpeditions, setStartedExpeditions] = useState([]);
	const [completedExpeditions, setCompletedExpeditions] = useState([]);

	useEffect(() => {
		const fetchExpeditions = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/expeditions");
				const data = await response.json();
				console.log("Fetched expeditions:", data); // Log the response data
				setExpeditions(data);
			} catch (error) {
				console.error("Error fetching expeditions:", error);
			}
		};

		fetchExpeditions();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchStartedExpeditions = async () => {
				try {
					const response = await fetch(
						"http://localhost:5000/api/users/expeditions",
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					);
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const data = await response.json();
					console.log("Fetched started expeditions:", data); // Log the response data
					const started = data
						.filter((expedition) => !expedition.completed)
						.map((expedition) => expedition.expeditionId);
					const completed = data
						.filter((expedition) => expedition.completed)
						.map((expedition) => expedition.expeditionId);
					setStartedExpeditions(started);
					setCompletedExpeditions(completed);
				} catch (error) {
					console.error("Error fetching started expeditions:", error);
				}
			};

			fetchStartedExpeditions();
		}
	}, [isAuthenticated]);

	const startExpedition = async (expeditionId) => {
		const response = await fetch(
			"http://localhost:5000/api/expeditions/start",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ expeditionId }),
			}
		);

		if (response.ok) {
			setStartedExpeditions([...startedExpeditions, expeditionId]);
		}
	};

	return (
		<Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack
				spacing={4}
				align="stretch"
				divider={<StackDivider borderColor="gray.200" />}>
				<Heading>Expeditions</Heading>
				{expeditions
					.filter(
						(expedition) => !completedExpeditions.includes(expedition._id)
					)
					.map((expedition) => (
						<Box key={expedition._id} p={4} borderWidth="1px" borderRadius="md">
							<Link as={RouterLink} to={`/expeditions/${expedition._id}`}>
								<Heading size="md">{expedition.title}</Heading>
								<Text>{expedition.description}</Text>
								{startedExpeditions.includes(expedition._id.toString()) && (
									<Text>Started</Text>
								)}
							</Link>
							{!startedExpeditions.includes(expedition._id.toString()) && (
								<Button
									colorScheme="blue"
									onClick={() => startExpedition(expedition._id)}>
									Start Expedition
								</Button>
							)}
						</Box>
					))}
			</VStack>
		</Box>
	);
};

export default ExpeditionsPage;
