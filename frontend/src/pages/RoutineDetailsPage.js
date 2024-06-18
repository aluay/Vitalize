import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Heading,
	Text,
	VStack,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import ProgressModal from "../components/ProgressModal";
import ConfirmModal from "../components/ConfirmModal";
import CongratulationsModal from "../components/CongratulationsModal";

const RoutineDetailsPage = () => {
	const { id } = useParams();
	const { isAuthenticated } = useAuth();
	const [routine, setRoutine] = useState(null);
	const [started, setStarted] = useState(false);
	const [progress, setProgress] = useState(0);
	const [completed, setCompleted] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isConfirmOpen,
		onOpen: onConfirmOpen,
		onClose: onConfirmClose,
	} = useDisclosure();
	const {
		isOpen: isCongratsOpen,
		onOpen: onCongratsOpen,
		onClose: onCongratsClose,
	} = useDisclosure();

	useEffect(() => {
		const fetchRoutine = async () => {
			const response = await fetch(`http://localhost:5000/api/routines/${id}`);
			const data = await response.json();
			setRoutine(data);
		};

		fetchRoutine();
	}, [id]);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchStartedRoutines = async () => {
				const response = await fetch(
					"http://localhost:5000/api/users/routines",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				const data = await response.json();
				const startedRoutine = data.find((r) => r.routineId === id);
				if (startedRoutine) {
					setStarted(true);
					setProgress(startedRoutine.progress);
					setCompleted(startedRoutine.completed);
				}
			};

			fetchStartedRoutines();
		}
	}, [isAuthenticated, id]);

	const startRoutine = async () => {
		const response = await fetch("http://localhost:5000/api/routines/start", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ routineId: id }),
		});

		if (response.ok) {
			setStarted(true);
			toast({
				title: "Routine started",
				description: "You have started the routine.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const abandonRoutine = async () => {
		const response = await fetch("http://localhost:5000/api/routines/abandon", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ routineId: id }),
		});

		if (response.ok) {
			setStarted(false);
			setProgress(0); // Reset progress
			toast({
				title: "Routine abandoned",
				description: "You have abandoned the routine.",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		}
		onConfirmClose();
	};

	const updateProgress = async (newProgress) => {
		const response = await fetch(
			"http://localhost:5000/api/routines/progress",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					routineId: id,
					progress: parseInt(newProgress),
				}), // Ensure progress is a number
			}
		);

		const data = await response.json();

		if (response.ok) {
			setProgress((prevProgress) => prevProgress + parseInt(newProgress)); // Accumulate progress
			if (data.completed) {
				setCompleted(true);
				onCongratsOpen();
			}
			toast({
				title: "Progress updated",
				description: "Your progress has been updated.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	if (!routine) {
		return <Text>Loading...</Text>;
	}

	return (
		<Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack spacing={4} align="stretch">
				<Heading>{routine.title}</Heading>
				<Text>{routine.description}</Text>
				<Text>Type: {routine.type}</Text>
				{started && (
					<>
						<Text>Progress: {progress}</Text>
						{!completed && (
							<Button colorScheme="blue" onClick={onOpen}>
								Update Progress
							</Button>
						)}
						<ProgressModal
							isOpen={isOpen}
							onClose={onClose}
							routineId={id}
							routineType={routine.type}
							updateProgress={updateProgress}
						/>
						<Button colorScheme="red" onClick={onConfirmOpen}>
							Abandon Routine
						</Button>
						<ConfirmModal
							isOpen={isConfirmOpen}
							onClose={onConfirmClose}
							onConfirm={abandonRoutine}
							title="Confirm Abandon Routine"
							description="Are you sure you want to abandon this routine? This action cannot be undone."
						/>
					</>
				)}
				{!started && !completed && (
					<Button colorScheme="blue" onClick={startRoutine}>
						Start Routine
					</Button>
				)}
				<Button variant="link" onClick={() => navigate("/routines")}>
					Back to Routines
				</Button>
				<CongratulationsModal
					isOpen={isCongratsOpen}
					onClose={onCongratsClose}
				/>
			</VStack>
		</Box>
	);
};

export default RoutineDetailsPage;
