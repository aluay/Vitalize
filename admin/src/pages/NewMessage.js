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
import MessageForm from "../components/MessageForm";
import { createMessage } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const NewMessage = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	const handleSubmit = async (data) => {
		try {
			await createMessage(data);
			toast({
				title: "Message created.",
				description: "The new message has been created successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/messages");
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error creating the message.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error creating message:", error);
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
					<Heading>Create New Message</Heading>
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

			<MessageForm initialData={{}} onSubmit={handleSubmit} />
		</Container>
	);
};

export default NewMessage;
