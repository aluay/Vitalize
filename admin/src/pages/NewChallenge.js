import React, { useContext } from "react";
import {
	Heading,
	useToast,
	Flex,
	Box,
	Spacer,
	Text,
	Badge,
	Container,
	HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ChallengeForm from "../components/ChallengeForm";
import { createChallenge } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const NewChallenge = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	const handleSubmit = async (data) => {
		try {
			await createChallenge(data);
			toast({
				title: "Challenge created.",
				description: "The new challenge has been created successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/challenges");
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error creating the challenge.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error creating challenge:", error);
		}
	};

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
					<Heading>Create New Challenge</Heading>
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

			<ChallengeForm initialData={{}} onSubmit={handleSubmit} />
		</Container>
	);
};

export default NewChallenge;
