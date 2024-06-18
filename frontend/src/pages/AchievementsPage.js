import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Text,
	VStack,
	StackDivider,
	useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const AchievementsPage = () => {
	const { isAuthenticated } = useAuth();
	const [achievements, setAchievements] = useState([]);
	const toast = useToast();

	useEffect(() => {
		const fetchAchievements = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/users/achievements",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				console.log("Response status:", response.status); // Log the response status
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				console.log("Fetched achievements:", data); // Log the response data
				setAchievements(data);
			} catch (error) {
				console.error("Error fetching achievements:", error);
				toast({
					title: "Error fetching achievements",
					description: "An error occurred while fetching achievements.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		};

		if (isAuthenticated) {
			fetchAchievements();
		}
	}, [isAuthenticated, toast]);

	return (
		<Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack
				spacing={4}
				align="stretch"
				divider={<StackDivider borderColor="gray.200" />}>
				<Heading>Achievements</Heading>
				{achievements.map((achievement) => (
					<Box
						key={achievement.achievementId}
						p={4}
						borderWidth="1px"
						borderRadius="md">
						<Heading size="md">{achievement.title}</Heading>
						<Text>{achievement.description}</Text>
					</Box>
				))}
			</VStack>
		</Box>
	);
};

export default AchievementsPage;
