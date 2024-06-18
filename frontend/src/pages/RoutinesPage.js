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

const RoutinesPage = () => {
	const { isAuthenticated } = useAuth();
	const [routines, setRoutines] = useState([]);
	const [startedRoutines, setStartedRoutines] = useState([]);
	const [completedRoutines, setCompletedRoutines] = useState([]);

	useEffect(() => {
		const fetchRoutines = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/routines");
				const data = await response.json();
				console.log("Fetched routines:", data); // Log the response data
				setRoutines(data);
			} catch (error) {
				console.error("Error fetching routines:", error);
			}
		};

		fetchRoutines();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchStartedRoutines = async () => {
				try {
					const response = await fetch(
						"http://localhost:5000/api/users/routines",
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
					console.log("Fetched started routines:", data); // Log the response data
					const started = data
						.filter((routine) => !routine.completed)
						.map((routine) => routine.routineId);
					const completed = data
						.filter((routine) => routine.completed)
						.map((routine) => routine.routineId);
					setStartedRoutines(started);
					setCompletedRoutines(completed);
				} catch (error) {
					console.error("Error fetching started routines:", error);
				}
			};

			fetchStartedRoutines();
		}
	}, [isAuthenticated]);

	const startRoutine = async (routineId) => {
		const response = await fetch("http://localhost:5000/api/routines/start", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ routineId }),
		});

		if (response.ok) {
			setStartedRoutines([...startedRoutines, routineId]);
		}
	};

	return (
		<Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack
				spacing={4}
				align="stretch"
				divider={<StackDivider borderColor="gray.200" />}>
				<Heading>Routines</Heading>
				{routines
					.filter((routine) => !completedRoutines.includes(routine._id))
					.map((routine) => (
						<Box key={routine._id} p={4} borderWidth="1px" borderRadius="md">
							<Link as={RouterLink} to={`/routines/${routine._id}`}>
								<Heading size="md">{routine.title}</Heading>
								<Text>{routine.description}</Text>
								{startedRoutines.includes(routine._id.toString()) && (
									<Text>Started</Text>
								)}
							</Link>
							{!startedRoutines.includes(routine._id.toString()) && (
								<Button
									colorScheme="blue"
									onClick={() => startRoutine(routine._id)}>
									Start Routine
								</Button>
							)}
						</Box>
					))}
			</VStack>
		</Box>
	);
};

export default RoutinesPage;
