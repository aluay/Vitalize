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
import { deleteExpedition, getExpeditionsByClient } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";
import { AddIcon } from "@chakra-ui/icons";

const Expeditions = () => {
	const [expeditions, setExpeditions] = useState([]);
	const [selectedExpedition, setSelectedExpedition] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const fetchExpeditions = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getExpeditionsByClient(selectedClient._id, token);
			setExpeditions(data);
		} catch (error) {
			console.error(
				"Error fetching expeditions",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchExpeditions();
	}, [fetchExpeditions]);

	const openDialog = (expedition) => {
		setSelectedExpedition(expedition);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedExpedition(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedExpedition) return;
		try {
			await deleteExpedition(selectedExpedition._id);
			fetchExpeditions();
			toast({
				title: "Expedition deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting expedition.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting expedition:", error);
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
						<Heading>{selectedClient.name}'s Expeditions</Heading>
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
						onClick={() => navigate("/expeditions/new")}
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
						{expeditions && expeditions.length > 0 ? (
							expeditions.map((expedition) => (
								<Tr key={expedition._id}>
									<Td
										textDecor={"underline"}
										_hover={{
											color: "blue.500",
										}}>
										<Link to={`/expeditions/edit/${expedition._id}`}>
											{expedition.title}
										</Link>
									</Td>
									<Td>{expedition.type}</Td>
									<Td
										dangerouslySetInnerHTML={{ __html: expedition.description }}
									/>
									<Td>
										<Button
											colorScheme="red"
											onClick={() => openDialog(expedition)}>
											Delete
										</Button>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={4} textAlign="center">
									No expeditions for this client
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
								Delete Expedition
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

export default Expeditions;
