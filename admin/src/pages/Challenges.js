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
	Container,
	Box,
	Spacer,
	HStack,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Text,
	IconButton,
	Badge,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { deleteChallenge, getChallengesByClient } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";
import { AddIcon } from "@chakra-ui/icons";

const Challenges = () => {
	const [challenges, setChallenges] = useState([]);
	const [selectedChallenge, setSelectedChallenge] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const fetchChallenges = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getChallengesByClient(selectedClient._id, token);
			setChallenges(data);
		} catch (error) {
			console.error(
				"Error fetching challenges:",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchChallenges();
	}, [fetchChallenges]);

	const openDialog = (challenge) => {
		setSelectedChallenge(challenge);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedChallenge(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedChallenge) return;
		try {
			await deleteChallenge(selectedChallenge._id);
			fetchChallenges();
			toast({
				title: "Challenge deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting challenge.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting challenge:", error);
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
						<Heading>{selectedClient.name}'s Challenges</Heading>
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
						aria-label="Create New challenge"
						icon={<AddIcon />}
						onClick={() => navigate("/challenges/new")}
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
						{challenges && challenges.length > 0 ? (
							challenges.map((challenge) => (
								<Tr key={challenge._id}>
									<Td
										textDecor={"underline"}
										_hover={{
											color: "blue.500",
										}}>
										<Link to={`/challenges/edit/${challenge._id}`}>
											{challenge.title}
										</Link>
									</Td>
									<Td>{challenge.type}</Td>
									<Td
										dangerouslySetInnerHTML={{ __html: challenge.description }}
									/>
									<Td>
										<Button
											colorScheme="red"
											onClick={() => openDialog(challenge)}>
											Delete
										</Button>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={4} textAlign="center">
									No challenges for this client
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
								Delete Challenge
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

export default Challenges;
