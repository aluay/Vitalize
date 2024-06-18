import React, { useState, useEffect, useContext, useCallback } from "react";
import {
	Heading,
	Button,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Flex,
	useToast,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Container,
	Box,
	Spacer,
	Badge,
	HStack,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { deleteRoutine, getRoutinesByClient } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";
import { AddIcon } from "@chakra-ui/icons";

const Routines = () => {
	const [routines, setRoutines] = useState([]);
	const [selectedRoutine, setSelectedRoutine] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const fetchRoutines = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getRoutinesByClient(selectedClient._id, token);
			setRoutines(data);
		} catch (error) {
			console.error(
				"Error fetching routines:",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchRoutines();
	}, [fetchRoutines]);

	const openDialog = (routine) => {
		setSelectedRoutine(routine);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedRoutine(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedRoutine) return;
		try {
			await deleteRoutine(selectedRoutine._id);
			fetchRoutines();
			toast({
				title: "Routine deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting routine.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting routine:", error);
			closeDialog();
		}
	};

	return (
		<Flex
			fontSize="sm"
			direction="column"
			w="100%"
			align="center"
			alignContent="center">
			<Container maxW="1280px">
				<Flex
					pt="2"
					pb="2"
					align="center"
					justify="space-between"
					wrap="wrap"
					width="100%">
					<Box>
						<Heading>{selectedClient.name}'s Routines</Heading>
					</Box>
					<Spacer />
					<Text as="b">
						Selected client:{" "}
						<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
					</Text>
				</Flex>
				<HStack mb="2">
					<Spacer />

					<IconButton
						aria-label="Search database"
						icon={<AddIcon />}
						onClick={() => navigate("/routines/new")}
					/>
					<NavMenu />
				</HStack>
				<Table mt="4">
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Type</Th>
							<Th>Description</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{routines && routines.length > 0 ? (
							routines.map((routine) => (
								<Tr key={routine._id}>
									<Td
										textDecor={"underline"}
										_hover={{
											color: "blue.500",
										}}>
										<Link to={`/routines/edit/${routine._id}`}>
											{routine.title}
										</Link>
									</Td>
									<Td>{routine.type}</Td>
									<Td
										dangerouslySetInnerHTML={{ __html: routine.description }}
									/>
									<Td>
										<Button
											colorScheme="red"
											onClick={() => openDialog(routine)}>
											Delete
										</Button>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={4} textAlign="center">
									No routines for this client
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
				<AlertDialog
					isOpen={isDialogOpen}
					leastDestructiveRef={undefined}
					onClose={closeDialog}>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontWeight="bold">
								Delete Routine
							</AlertDialogHeader>

							<AlertDialogBody>
								Are you sure? You can't undo this action afterwards.
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button onClick={closeDialog}>Cancel</Button>
								<Button colorScheme="red" onClick={handleDelete} ml={3}>
									Delete
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</Container>
		</Flex>
	);
};

export default Routines;
