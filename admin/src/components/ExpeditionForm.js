import React, { useState, useContext } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Flex,
	Container,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { ClientContext } from "../context/ClientContext";

const ExpeditionForm = ({ initialData = {}, onSubmit }) => {
	const navigate = useNavigate();

	// const formatDate = (dateString) => {
	// if (!dateString) return "";
	// 	const year = dateString.substring(0, 4);
	// 	const month = dateString.substring(5, 7);
	// 	const day = dateString.substring(8, 10);
	// 	return `${year}-${month}-${day}`;
	// };
	// const [startDate, setStartDate] = useState(
	// 	formatDate(initialData.startDate) || ""
	// );
	// const [endDate, setEndDate] = useState(formatDate(initialData.endDate) || "");

	const [title, setTitle] = useState(initialData.title || "");
	const [description, setDescription] = useState(initialData.description || "");
	const { selectedClient } = useContext(ClientContext);
	const client = selectedClient;

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (new Date(endDate) <= new Date(startDate)) {
		// 	toast({
		// 		title: "End date must be after start date.",
		// 		status: "error",
		// 		duration: 5000,
		// 		isClosable: true,
		// 	});
		// 	return;
		// }
		onSubmit({
			title,
			description,
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
					<HStack display="flex" justifyContent="space-between">
						<Button type="submit" colorScheme="blue" mt={4}>
							Submit
						</Button>
						<Button
							mt={4}
							colorScheme="red"
							onClick={() => navigate("/expeditions")}>
							Cancel
						</Button>
					</HStack>
				</Box>
			</Container>
		</Flex>
	);
};

export default ExpeditionForm;
