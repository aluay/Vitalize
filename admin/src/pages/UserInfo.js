import React, { useEffect, useState, useContext } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Flex,
	Heading,
	HStack,
	Text,
	Container,
	Box,
	Badge,
	Spacer,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const UserInfo = () => {
	const { userId } = useParams();
	const [userData, setUserData] = useState({});
	const [originalUserData, setOriginalUserData] = useState({});
	const { selectedClient } = useContext(ClientContext);
	const [isEditing, setIsEditing] = useState(false);
	const [isChanged, setIsChanged] = useState(false);
	const toast = useToast();

	useEffect(() => {
		if (userId) {
			fetchUserData(userId);
		}
	}, [userId]);

	const fetchUserData = async (userId) => {
		try {
			const token = localStorage.getItem("token"); // Get token from local storage
			const data = await getUserById(userId, token);
			setUserData(data);
			setOriginalUserData(data); // Save the original data to revert changes if needed
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setIsChanged(true);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setUserData(originalUserData); // Revert changes to the original data
		setIsEditing(false);
		setIsChanged(false);
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem("token"); // Get token from local storage
			await updateUser(userId, userData, token);
			setIsEditing(false);
			setIsChanged(false);
			toast({
				title: "User updated successfully",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			console.error("Error updating user:", error);
			toast({
				title: "Error updating user",
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
					<Input type="text" value={userData._id || ""} isDisabled />
				</FormControl>
				<FormControl id="username" isDisabled={!isEditing} mt={4}>
					<FormLabel>Username</FormLabel>
					<Input
						type="text"
						name="username"
						value={userData.username || ""}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl id="email" isDisabled={!isEditing} mt={4}>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						name="email"
						value={userData.email || ""}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl id="firstName" isDisabled={!isEditing} mt={4}>
					<FormLabel>First Name</FormLabel>
					<Input
						type="text"
						name="firstName"
						value={userData.firstName || ""}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl id="lastName" isDisabled={!isEditing} mt={4}>
					<FormLabel>Last Name</FormLabel>
					<Input
						type="text"
						name="lastName"
						value={userData.lastName || ""}
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

export default UserInfo;
