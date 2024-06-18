import React, { useContext, useEffect, useState } from "react";
import {
	Flex,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Heading,
	HStack,
	Text,
	Container,
	Spacer,
	Box,
	Badge,
} from "@chakra-ui/react";
import { ClientContext } from "../context/ClientContext";
import { getClientById, updateClient } from "../api";
import NavMenu from "../components/NavMenu";

const ClientInfo = () => {
	const { selectedClient } = useContext(ClientContext);
	const [clientData, setClientData] = useState({});
	const [originalClientData, setOriginalClientData] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [isChanged, setIsChanged] = useState(false);
	const toast = useToast();

	useEffect(() => {
		if (selectedClient) {
			fetchClientData(selectedClient._id);
		}
	}, [selectedClient]);

	const fetchClientData = async (clientId) => {
		try {
			const token = localStorage.getItem("token"); // Get token from local storage
			const data = await getClientById(clientId, token);
			setClientData(data);
			setOriginalClientData(data); // Save the original data to revert changes if needed
		} catch (error) {
			console.error("Error fetching client data:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setClientData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setIsChanged(true);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setClientData(originalClientData); // Revert changes to the original data
		setIsEditing(false);
		setIsChanged(false);
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem("token"); // Get token from local storage
			await updateClient(selectedClient, clientData, token);
			setIsEditing(false);
			setIsChanged(false);
			toast({
				title: "Client updated successfully",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			console.error("Error updating client:", error);
			toast({
				title: "Error updating client",
				description: error.response?.data?.message || "An error occurred",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
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
						<Heading>{selectedClient.name}'s Info</Heading>
					</Box>
					<Spacer />
					<Text as="b">
						Selected client:{" "}
						<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
					</Text>
				</Flex>
				<HStack mb="2">
					<Spacer />
					<NavMenu />
				</HStack>
				<FormControl id="id" isDisabled>
					<FormLabel>ID</FormLabel>
					<Input type="text" value={clientData._id || ""} isDisabled />
				</FormControl>
				<FormControl id="name" isDisabled={!isEditing} mt={4}>
					<FormLabel>Name</FormLabel>
					<Input
						type="text"
						name="name"
						value={clientData.name || ""}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl id="domain" isDisabled={!isEditing} mt={4}>
					<FormLabel>Domain</FormLabel>
					<Input
						type="text"
						name="domain"
						value={clientData.domain || ""}
						onChange={handleInputChange}
					/>
				</FormControl>
				<HStack>
					<Button
						mt={4}
						colorScheme="blue"
						onClick={handleEdit}
						display={isEditing ? "none" : "block"}
						isDisabled={isEditing}>
						Edit
					</Button>
					<Flex w="100%" justifyContent="space-between">
						<Button
							mt={4}
							colorScheme="red"
							onClick={handleCancel}
							display={isEditing ? "block" : "none"}
							isDisabled={!isEditing}>
							Cancel
						</Button>
						<Button
							mt={4}
							colorScheme="blue"
							onClick={handleSave}
							display={isEditing ? "block" : "none"}
							isDisabled={!isChanged || !isEditing}>
							{" "}
							Save
						</Button>
					</Flex>
				</HStack>
			</Container>
		</Flex>
	);
};

export default ClientInfo;
