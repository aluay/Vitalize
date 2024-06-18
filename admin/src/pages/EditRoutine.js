import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Flex,
	Heading,
	Spinner,
	useToast,
	Container,
	Box,
	Spacer,
	HStack,
	Text,
	Badge,
} from "@chakra-ui/react";
import RoutineForm from "../components/RoutineForm";
import { getRoutineById, updateRoutine } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const EditRoutine = () => {
	const { id } = useParams();
	const [routine, setRoutine] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);

	useEffect(() => {
		const fetchRoutine = async () => {
			try {
				const data = await getRoutineById(id);
				setRoutine(data);
			} catch (error) {
				toast({
					title: "Error",
					description: "Could not fetch routine.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} finally {
				setLoading(false);
			}
		};

		fetchRoutine();
	}, [id, toast]);

	const handleUpdate = async (updatedRoutine) => {
		try {
			await updateRoutine(id, updatedRoutine);
			toast({
				title: "Routine updated.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/routines");
		} catch (error) {
			console.error("Error updating routine:", error);
			toast({
				title: "Error",
				description: "Could not update routine.",
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
					<Heading>Edit Routine</Heading>
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

			<RoutineForm initialData={routine} onSubmit={handleUpdate} />
		</Container>
	);
};

export default EditRoutine;
