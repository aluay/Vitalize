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
	Box,
	Spacer,
	Container,
	HStack,
	Badge,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { deleteIncentive, getIncentivesByClient } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";
import { AddIcon } from "@chakra-ui/icons";

const Incentives = () => {
	const [incentives, setIncentives] = useState([]);
	const [selectedIncentive, setSelectedIncentive] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const fetchIncentives = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getIncentivesByClient(selectedClient._id, token);
			setIncentives(data);
		} catch (error) {
			console.error(
				"Error fetching incentives:",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchIncentives();
	}, [fetchIncentives]);

	const openDialog = (challenge) => {
		setSelectedIncentive(challenge);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedIncentive(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedIncentive) return;
		try {
			await deleteIncentive(selectedIncentive._id);
			fetchIncentives();
			toast({
				title: "Incentive deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting incentive.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting incentive:", error);
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
						<Heading>{selectedClient.name}'s Incentives</Heading>
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
						onClick={() => navigate("/incentives/new")}
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
						{incentives && incentives.length > 0 ? (
							incentives.map((incentive) => (
								<Tr key={incentive._id}>
									<Td
										textDecor={"underline"}
										_hover={{
											color: "blue.500",
										}}>
										<Link to={`/incentives/edit/${incentive._id}`}>
											{incentive.title}
										</Link>
									</Td>
									<Td>{incentive.type}</Td>
									<Td
										dangerouslySetInnerHTML={{ __html: incentive.description }}
									/>
									<Td>
										<Button
											colorScheme="red"
											onClick={() => openDialog(incentive)}>
											Delete
										</Button>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={4} textAlign="center">
									No incentives for this client
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
								Delete Incentive
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

export default Incentives;
