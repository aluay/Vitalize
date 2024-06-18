import React, {
	useState,
	useRef,
	useContext,
	useEffect,
	useCallback,
} from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	useToast,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	HStack,
	Heading,
	Text,
	TableContainer,
	Container,
	Spacer,
	Badge,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";
import { getUsersByClient } from "../api";

const Users = () => {
	const [file, setFile] = useState(null);
	const toast = useToast();
	const fileInputRef = useRef(null);
	const { selectedClient } = useContext(ClientContext);
	const [users, setUsers] = useState([]);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const handleUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		formData.append("clientId", selectedClient._id);

		try {
			const response = await axios.post(
				"http://localhost:5000/api/upload/users",
				formData,
				token ? { headers: { Authorization: `Bearer ${token}` } } : null
			);
			toast({
				title: response.data.message,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			// Clear the file input field
			setFile(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (error) {
			toast({
				title: "Error uploading users",
				description: error.response?.data?.message || "An error occurred",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const fetchUsers = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getUsersByClient(selectedClient._id, token);
			setUsers(data);
		} catch (error) {
			console.error(
				"Error fetching users:",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleRowClick = (userId) => {
		navigate(`/users/edit/${userId}`);
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
						<Heading>{selectedClient.name}'s Users</Heading>
					</Box>
					<Spacer />
					<Text as="b">
						Selected client:{" "}
						<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
					</Text>
				</Flex>
				<HStack mb="2">
					<Spacer />
					<Box as="form" onSubmit={handleUpload}>
						<FormControl id="file" isRequired>
							{!file ? (
								<Flex>
									<Input
										type="file"
										ref={fileInputRef}
										style={{ display: "none" }}
										onChange={(e) => setFile(e.target.files[0])}
									/>
									<Button onClick={() => fileInputRef.current.click()}>
										{<AddIcon />}
									</Button>
								</Flex>
							) : (
								<Flex>
									<HStack display="flex">
										<Text as="b">
											Selected file:{" "}
											<Badge colorScheme="red">{file.name}</Badge>{" "}
										</Text>
										<HStack>
											<Button type="submit">Upload</Button>
											<Button
												type="submit"
												colorScheme="red"
												onClick={() => setFile(null)}>
												Cancel
											</Button>
										</HStack>
									</HStack>
								</Flex>
							)}
						</FormControl>
					</Box>
					<NavMenu />
				</HStack>
				<TableContainer>
					<Table>
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Email</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map((user) => (
								<Tr
									key={user._id}
									_hover={{
										color: "blue.500",
										cursor: "pointer",
										border: "1px solid blue.200",
									}}
									onClick={() => handleRowClick(user._id)}>
									<Td>{user.username}</Td>
									<Td>{user.email}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Container>
		</Flex>
		// <Flex fontSize="sm">
		// 	<NavMenu />
		// 	<Flex direction="column" flex="1" p="4">
		// 		<HStack mb="4" display="flex" justifyContent="space-between">
		// 			<Heading>{selectedClient.name}'s Users</Heading>
		// 			<HStack>
		// 				<Box as="form" onSubmit={handleUpload}>
		// 					<FormControl id="file" isRequired>
		// 						{!file ? (
		// 							<Flex>
		// 								<Input
		// 									type="file"
		// 									ref={fileInputRef}
		// 									style={{ display: "none" }}
		// 									onChange={(e) => setFile(e.target.files[0])}
		// 								/>
		// 								<Button
		//
		// 									mr="4"
		// 									colorScheme="blue"
		// 									onClick={() => fileInputRef.current.click()}>
		// 									Upload users
		// 								</Button>
		// 								<Alert status="error" borderRadius={5}>
		// 									<AlertIcon />
		// 									<Text as="b">Selected client: {selectedClient.name}</Text>
		// 								</Alert>
		// 							</Flex>
		// 						) : (
		// 							<Flex>
		// 								<HStack display="flex">
		// 									<Alert status="error" borderRadius={5}>
		// 										<AlertIcon />
		// 										<Text as="b">Selected file: {file.name}</Text>
		// 									</Alert>
		// 									<HStack>
		// 										<Button  type="submit" colorScheme="blue">
		// 											Upload
		// 										</Button>
		// 										<Button
		//
		// 											type="submit"
		// 											colorScheme="red"
		// 											onClick={() => setFile(null)}>
		// 											Cancel
		// 										</Button>
		// 									</HStack>
		// 								</HStack>
		// 							</Flex>
		// 						)}
		// 					</FormControl>
		// 				</Box>
		// 			</HStack>
		// 		</HStack>
		// 		<TableContainer>
		// 			<Table>
		// 				<Thead>
		// 					<Tr>
		// 						<Th>Name</Th>
		// 						<Th>Email</Th>
		// 					</Tr>
		// 				</Thead>
		// 				<Tbody>
		// 					{users.map((user) => (
		// 						<Tr
		// 							key={user._id}
		// 							_hover={{
		// 								color: "blue.500",
		// 								cursor: "pointer",
		// 								border: "1px solid blue.200",
		// 							}}
		// 							onClick={() => handleRowClick(user._id)}>
		// 							<Td>{user.username}</Td>
		// 							<Td>{user.email}</Td>
		// 						</Tr>
		// 					))}
		// 				</Tbody>
		// 			</Table>
		// 		</TableContainer>
		// 	</Flex>
		// </Flex>
	);
};

export default Users;
