import React, { useContext } from "react";
import {
	Flex,
	Heading,
	useToast,
	Container,
	Box,
	Spacer,
	Badge,
	Text,
	HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ExpeditionForm from "../components/ExpeditionForm";
import { createExpedition } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const NewExpedition = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	const handleSubmit = async (data) => {
		try {
			await createExpedition(data);
			toast({
				title: "Expedition created.",
				description: "The new expedition has been created successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/expeditions");
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error creating the expedition.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error creating expedition:", error);
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
					<Heading>Create New Expedition</Heading>
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

			<ExpeditionForm initialData={{}} onSubmit={handleSubmit} />
		</Container>
	);
};

export default NewExpedition;
