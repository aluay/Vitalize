import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Flex,
	Heading,
	Spinner,
	HStack,
	useToast,
	Box,
	Spacer,
	Text,
	Badge,
	Container,
} from "@chakra-ui/react";
import ChallengeForm from "../components/ChallengeForm";
import { getChallengeById, updateChallenge } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";
const EditChallenge = () => {
	const { id } = useParams();
	const [challenge, setChallenge] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);

	useEffect(() => {
		const fetchChallenge = async () => {
			try {
				const data = await getChallengeById(id);
				setChallenge(data);
			} catch (error) {
				toast({
					title: "Error",
					description: "Could not fetch challenge.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} finally {
				setLoading(false);
			}
		};

		fetchChallenge();
	}, [id, toast]);

	const handleUpdate = async (updatedChallenge) => {
		try {
			await updateChallenge(id, updatedChallenge);
			toast({
				title: "Challenge updated.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/challenges");
		} catch (error) {
			console.error("Error updating challenge:", error);
			toast({
				title: "Error",
				description: "Could not update challenge.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	if (loading) {
		return <Spinner size="xl" />;
	}

	return (
		<Container maxW="1280px">
			<Flex
				fontSize="sm"
				pt="2"
				pb="2"
				align="center"
				justify="space-between"
				wrap="wrap"
				w="100%">
				<Box>
					<Heading>Edit Challenge</Heading>
				</Box>
				<Spacer />
				<Text as="b">
					Selected client:{" "}
					<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
				</Text>
			</Flex>
			<HStack>
				<Spacer />
				<NavMenu />
			</HStack>

			<ChallengeForm initialData={challenge} onSubmit={handleUpdate} />
		</Container>
	);
};

export default EditChallenge;
