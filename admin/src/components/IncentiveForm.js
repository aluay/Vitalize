import React, { useState, useContext } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Flex,
	useToast,
	Container,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import styles
import { ClientContext } from "../context/ClientContext";

const IncentiveForm = ({ initialData = {}, onSubmit }) => {
	const navigate = useNavigate();
	const toast = useToast();

	const formatDate = (dateString) => {
		if (!dateString) return "";
		const year = dateString.substring(0, 4);
		const month = dateString.substring(5, 7);
		const day = dateString.substring(8, 10);
		return `${year}-${month}-${day}`;
	};

	const [title, setTitle] = useState(initialData.title || "");
	const [description, setDescription] = useState(initialData.description || "");
	const [startDate, setStartDate] = useState(
		formatDate(initialData.startDate) || ""
	);
	const [endDate, setEndDate] = useState(formatDate(initialData.endDate) || "");
	const { selectedClient } = useContext(ClientContext);
	const client = selectedClient;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (new Date(endDate) <= new Date(startDate)) {
			toast({
				title: "End date must be after start date.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		onSubmit({
			title,
			description,
			startDate,
			endDate,
			client,
		});
	};

	return (
		<Flex
			fontSize="sm"
			direction="column"
			w="100%"
			align="center"
			alignContent="center">
			<Container maxW="1280px">
				<Box fontSize="sm" as="form" onSubmit={handleSubmit}>
					<FormControl id="title" isRequired>
						<FormLabel>Title</FormLabel>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl id="description" isRequired mt={4}>
						<FormLabel>Description</FormLabel>
						<ReactQuill value={description} onChange={setDescription} />
					</FormControl>
					<HStack>
						<FormControl id="startDate" isRequired>
							<FormLabel>Start Date</FormLabel>
							<Input
								variant="filled"
								type="date"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
							/>
						</FormControl>
						<FormControl id="startDate" isRequired>
							<FormLabel>End Date</FormLabel>
							<Input
								variant="filled"
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</FormControl>
					</HStack>
					<HStack display="flex" justifyContent="space-between">
						<Button type="submit" colorScheme="blue" mt={4}>
							Submit
						</Button>
						<Button
							mt={4}
							colorScheme="red"
							onClick={() => navigate("/incentives")}>
							Cancel
						</Button>
					</HStack>
				</Box>
			</Container>
		</Flex>
		// <Box fontSize="sm" w="2xl" as="form" onSubmit={handleSubmit}>
		// 	<Flex
		// 		mb={4}
		// 		alignItems="center"
		// 		border={"2px"}
		// 		borderColor={"red.300"}
		// 		p={2}
		// 		rounded="md">
		// 		<Text mr={4}>Select Client</Text>
		// 		<ClientDropdown />
		// 	</Flex>
		// 	<FormControl id="title" isRequired>
		// 		<FormLabel>Title</FormLabel>
		// 		<Input
		// 			type="text"
		// 			value={title}
		// 			onChange={(e) => setTitle(e.target.value)}
		// 		/>
		// 	</FormControl>
		// 	<FormControl id="description" isRequired mt={4}>
		// 		<FormLabel>Description</FormLabel>
		// 		<ReactQuill value={description} onChange={setDescription} />
		// 	</FormControl>
		// 	<HStack>
		// 		<FormControl id="startDate" isRequired>
		// 			<FormLabel>Start Date</FormLabel>
		// 			<Input
		// 				variant="filled"
		// 				type="date"
		// 				value={startDate}
		// 				onChange={(e) => setStartDate(e.target.value)}
		// 			/>
		// 		</FormControl>
		// 		<FormControl id="startDate" isRequired>
		// 			<FormLabel>End Date</FormLabel>
		// 			<Input
		// 				variant="filled"
		// 				type="date"
		// 				value={endDate}
		// 				onChange={(e) => setEndDate(e.target.value)}
		// 			/>
		// 		</FormControl>
		// 	</HStack>
		// 	<HStack display="flex" justifyContent="space-between">
		// 		<Button  type="submit" colorScheme="blue" mt={4}>
		// 			Submit
		// 		</Button>
		// 		<Button
		//
		// 			mt={4}
		// 			colorScheme="red"
		// 			onClick={() => navigate("/incentives")}>
		// 			Cancel
		// 		</Button>
		// 	</HStack>
		// </Box>
	);
};

export default IncentiveForm;
