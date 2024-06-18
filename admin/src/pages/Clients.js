import React, { useState, useRef, useEffect } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { getClients, deleteClient } from "../api";
import { useNavigate } from "react-router-dom";

const Clients = () => {
	const [file, setFile] = useState(null);
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const fileInputRef = useRef(null);

	useEffect(() => {
		fetchClients();
	}, []);

	const fetchClients = async () => {
		try {
			const data = await getClients();
			setClients(data);
		} catch (error) {
			console.error("Error fetching clients:", error);
		}
	};

	const openDialog = (client) => {
		setSelectedClient(client);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedClient(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedClient) return;
		try {
			await deleteClient(selectedClient._id);
			fetchClients();
			toast({
				title: "Client deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting client.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting client:", error);
			closeDialog();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		const token = localStorage.getItem("token");
		try {
			const response = await axios.post(
				"http://localhost:5000/api/upload/clients",
				formData,
				token ? { headers: { Authorization: `Bearer ${token}` } } : null
			);
			toast({
				title: response.data.message,
				description: response.data.newClients
					? `${response.data.newClients.length} new clients uploaded`
					: "",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			setFile(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (error) {
			toast({
				title: "Error uploading clients",
				description: error.response?.data?.message || "An error occurred",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Box fontSize="sm">
			<Box as="form" onSubmit={handleSubmit}>
				<FormControl id="file" isRequired>
					<FormLabel>Upload Clients CSV</FormLabel>
					<Input
						accept="text/csv"
						type="file"
						ref={fileInputRef}
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</FormControl>
				<Button type="submit" colorScheme="blue" mt={4}>
					Upload
				</Button>
			</Box>
			<Box>
				<Table mt={4}>
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Domain</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{clients.map((client) => (
							<Tr key={client._id}>
								<Td>{client.name}</Td>
								<Td>{client.domain}</Td>

								<Td>
									<Button
										colorScheme="blue"
										mr={2}
										onClick={() => navigate(`/clients/edit/${client._id}`)}>
										Edit
									</Button>
									<Button colorScheme="red" onClick={() => openDialog(client)}>
										Delete
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
				<AlertDialog
					isOpen={isDialogOpen}
					leastDestructiveRef={undefined}
					onClose={closeDialog}>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontWeight="bold">
								Delete Client
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
			</Box>
		</Box>
	);
};

export default Clients;
