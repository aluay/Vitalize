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

const ExpeditionDetailsPage = () => {
	const { id } = useParams();
	const { isAuthenticated } = useAuth();
	const [expedition, setExpedition] = useState(null);
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
		const fetchExpedition = async () => {
			const response = await fetch(
				`http://localhost:5000/api/expeditions/${id}`
			);
			const data = await response.json();
			setExpedition(data);
		};

		fetchExpedition();
	}, [id]);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchStartedExpeditions = async () => {
				const response = await fetch(
					"http://localhost:5000/api/users/expeditions",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				const data = await response.json();
				const startedExpedition = data.find((e) => e.expeditionId === id);
				if (startedExpedition) {
					setStarted(true);
					setProgress(startedExpedition.progress);
					setCompleted(startedExpedition.completed);
				}
			};

			fetchStartedExpeditions();
		}
	}, [isAuthenticated, id]);

	const startExpedition = async () => {
		const response = await fetch(
			"http://localhost:5000/api/expeditions/start",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ expeditionId: id }),
			}
		);

		if (response.ok) {
			setStarted(true);
			toast({
				title: "Expedition started",
				description: "You have started the expedition.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const abandonExpedition = async () => {
		const response = await fetch(
			"http://localhost:5000/api/expeditions/abandon",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ expeditionId: id }),
			}
		);

		if (response.ok) {
			setStarted(false);
			setProgress(0); // Reset progress
			toast({
				title: "Expedition abandoned",
				description: "You have abandoned the expedition.",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		}
		onConfirmClose();
	};

	const updateProgress = async (newProgress) => {
		const response = await fetch(
			"http://localhost:5000/api/expeditions/progress",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					expeditionId: id,
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

	if (!expedition) {
		return <Text>Loading...</Text>;
	}

	return (
		<Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack spacing={4} align="stretch">
				<Heading>{expedition.title}</Heading>
				<Text>{expedition.description}</Text>
				<Text>Type: {expedition.type}</Text>
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
							expeditionId={id}
							expeditionType={expedition.type}
							updateProgress={updateProgress}
						/>
						<Button colorScheme="red" onClick={onConfirmOpen}>
							Abandon Expedition
						</Button>
						<ConfirmModal
							isOpen={isConfirmOpen}
							onClose={onConfirmClose}
							onConfirm={abandonExpedition}
							title="Confirm Abandon Expedition"
							description="Are you sure you want to abandon this expedition? This action cannot be undone."
						/>
					</>
				)}
				{!started && !completed && (
					<Button colorScheme="blue" onClick={startExpedition}>
						Start Expedition
					</Button>
				)}
				<Button variant="link" onClick={() => navigate("/expeditions")}>
					Back to Expeditions
				</Button>
				<CongratulationsModal
					isOpen={isCongratsOpen}
					onClose={onCongratsClose}
				/>
			</VStack>
		</Box>
	);
};

export default ExpeditionDetailsPage;
