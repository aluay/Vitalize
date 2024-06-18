import React, { useContext } from "react";
import {
	Flex,
	Heading,
	useToast,
	Container,
	Box,
	Spacer,
	Text,
	Badge,
	HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import RoutineForm from "../components/RoutineForm";
import { createRoutine } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const NewRoutine = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	const handleSubmit = async (data) => {
		try {
			await createRoutine(data);
			toast({
				title: "Routine created.",
				description: "The new routine has been created successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/routines");
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error creating the routine.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error creating routine:", error);
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
					<Heading>Create New Routine</Heading>
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

			<RoutineForm initialData={{}} onSubmit={handleSubmit} />
		</Container>
	);
};

export default NewRoutine;
