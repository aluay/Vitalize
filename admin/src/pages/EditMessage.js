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
import MessageForm from "../components/MessageForm";
import { getMessageById, updateMessage } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const EditMessage = () => {
	const { id } = useParams();
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);

	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const data = await getMessageById(id);
				setMessage(data);
			} catch (error) {
				toast({
					title: "Error",
					description: "Could not fetch message.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} finally {
				setLoading(false);
			}
		};

		fetchMessage();
	}, [id, toast]);

	const handleUpdate = async (updatedMessage) => {
		try {
			await updateMessage(id, updateMessage);
			toast({
				title: "Message updated.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/messages");
		} catch (error) {
			console.error("Error updating message:", error);
			toast({
				title: "Error",
				description: "Could not update message.",
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
					<Heading>Edit Message</Heading>
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

			<MessageForm initialData={message} onSubmit={handleUpdate} />
		</Container>
	);
};

export default EditMessage;
