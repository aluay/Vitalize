import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Heading,
	Text,
	VStack,
	useToast,
	Image,
	useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import ProgressModal from "../components/ProgressModal";
import ConfirmModal from "../components/ConfirmModal";
import CongratulationsModal from "../components/CongratulationsModal";

const ChallengeDetailsPage = () => {
	const { id } = useParams();
	const { isAuthenticated } = useAuth();
	const [challenge, setChallenge] = useState(null);
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
		const fetchChallenge = async () => {
			const response = await fetch(
				`http://localhost:5000/api/challenges/${id}`
			);
			const data = await response.json();
			setChallenge(data);
		};

		fetchChallenge();
	}, [id]);

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
				const startedChallenge = data.find((c) => c.challengeId === id);
				if (startedChallenge) {
					setStarted(true);
					setProgress(startedChallenge.progress);
					setCompleted(startedChallenge.completed);
				}
			};

			fetchStartedChallenges();
		}
	}, [isAuthenticated, id]);

	const startChallenge = async () => {
		const response = await fetch("http://localhost:5000/api/challenges/start", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ challengeId: id }),
		});

		if (response.ok) {
			setStarted(true);
			toast({
				title: "Challenge started",
				description: "You have started the challenge.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const abandonChallenge = async () => {
		const response = await fetch(
			"http://localhost:5000/api/challenges/abandon",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ challengeId: id }),
			}
		);

		if (response.ok) {
			setStarted(false);
			setProgress(0); // Reset progress
			toast({
				title: "Challenge abandoned",
				description: "You have abandoned the challenge.",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
		}
		onConfirmClose();
	};

	const updateProgress = async (newProgress) => {
		const response = await fetch(
			"http://localhost:5000/api/challenges/progress",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					challengeId: id,
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

	if (!challenge) {
		return <Text>Loading...</Text>;
	}

	return (
		<Box maxW="sm" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
			<VStack spacing={4} align="stretch">
				<Image src={challenge.img} alt="Challenge image" borderRadius="lg" />
				<Heading>{challenge.title}</Heading>
				<Text>{challenge.description}</Text>
				<Text>Type: {challenge.type}</Text>
				{started && (
					<>
						<Text>
							{challenge.type === "step" && `Progress: ${progress} Steps`}
							{challenge.type === "minute" && `Progress: ${progress} Minutes`}
							{challenge.type === "calorie" && `Progress: ${progress} Calories`}
							{challenge.type === "other" && `Progress: ${progress}`}
						</Text>
						<Button colorScheme="blue" onClick={onOpen}>
							Update Progress
						</Button>
						<ProgressModal
							isOpen={isOpen}
							onClose={onClose}
							challengeId={id}
							challengeType={challenge.type}
							updateProgress={updateProgress}
						/>
						<Button colorScheme="red" onClick={onConfirmOpen}>
							Abandon Challenge
						</Button>
						<ConfirmModal
							isOpen={isConfirmOpen}
							onClose={onConfirmClose}
							onConfirm={abandonChallenge}
							title="Confirm Abandon Challenge"
							description="Are you sure you want to abandon this challenge? This action cannot be undone."
						/>
					</>
				)}
				{!started && !completed && (
					<Button colorScheme="blue" onClick={startChallenge}>
						Start Challenge
					</Button>
				)}
				<Button variant="link" onClick={() => navigate("/challenges")}>
					Back to Challenges
				</Button>
				<CongratulationsModal
					isOpen={isCongratsOpen}
					onClose={onCongratsClose}
				/>
			</VStack>
		</Box>
	);
};

export default ChallengeDetailsPage;
