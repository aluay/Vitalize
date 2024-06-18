import React, { useContext, useEffect, useState, useCallback } from "react";
import {
	Box,
	Button,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
	Flex,
	Container,
	Heading,
	Text,
	Badge,
	HStack,
	Spacer,
	IconButton,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ClientContext } from "../context/ClientContext";
import { getMessagesByClient, deleteMessage } from "../api";
import { Link, useNavigate } from "react-router-dom";
import NavMenu from "../components/NavMenu";

const Messages = () => {
	const { selectedClient } = useContext(ClientContext);
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const toast = useToast();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const fetchMessages = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getMessagesByClient(selectedClient._id, token);
			setMessages(data);
		} catch (error) {
			console.error(
				"Error fetching messages:",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages]);

	const openDialog = (message) => {
		setSelectedMessage(message);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedMessage(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedMessage) return;
		try {
			await deleteMessage(selectedMessage._id);
			fetchMessages();
			toast({
				title: "Message deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting message.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting message:", error);
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
						<Heading>{selectedClient.name}'s Messages</Heading>
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
						aria-label="Create New Message"
						icon={<AddIcon />}
						onClick={() => navigate("/messages/new")}
					/>
					<NavMenu />
				</HStack>
				<Table>
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Subject</Th>
							<Th>Body</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{messages && messages.length > 0 ? (
							messages.map((message) => (
								<Tr key={message._id}>
									<Td
										textDecor={"underline"}
										_hover={{
											color: "blue.500",
										}}>
										<Link to={`/messages/edit/${message._id}`}>
											{message.title}
										</Link>
									</Td>
									<Td>{message.subject}</Td>
									<Td dangerouslySetInnerHTML={{ __html: message.body }} />
									<Td>
										<Button
											colorScheme="red"
											onClick={() => openDialog(message)}>
											Delete
										</Button>
									</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={4} textAlign="center">
									No messages for this client
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
								Delete Message
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

export default Messages;
