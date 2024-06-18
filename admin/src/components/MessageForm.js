import React, { useState, useContext } from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	useToast,
	Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { ClientContext } from "../context/ClientContext";

const MessageForm = ({ initialData = {}, onSubmit }) => {
	const formatDate = (dateString) => {
		if (!dateString) return "";
		const year = dateString.substring(0, 4);
		const month = dateString.substring(5, 7);
		const day = dateString.substring(8, 10);
		return `${year}-${month}-${day}`;
	};

	const { selectedClient } = useContext(ClientContext);
	const [title, setTitle] = useState(initialData.title || "");
	const [subject, setSubject] = useState(initialData.subject || "");
	const [body, setBody] = useState(initialData.body || "");
	const [sendStartDate, setSendStartDate] = useState(
		formatDate(initialData.startDate) || ""
	);
	const [sendEndDate, setSendEndDate] = useState(
		formatDate(initialData.endDate) || ""
	);
	const client = selectedClient;

	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (new Date(sendEndDate) <= new Date(sendStartDate)) {
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
			subject,
			body,
			client,
			sendStartDate,
			sendEndDate,
			// activityType,
			// activityId,
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
					<FormControl id="title" isRequired mb={4}>
						<FormLabel>Title</FormLabel>
						<Input
							type="text"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl id="subject" isRequired mb={4}>
						<FormLabel>Subject</FormLabel>
						<Input
							type="text"
							name="subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</FormControl>
					<FormControl id="body" isRequired mb={4}>
						<FormLabel>Body</FormLabel>
						<ReactQuill value={body} onChange={setBody} />
					</FormControl>
					<FormControl id="sendStartDate" isRequired mb={4}>
						<FormLabel>Send Start Date</FormLabel>
						<Input
							type="date"
							name="sendStartDate"
							value={sendStartDate}
							onChange={(e) => setSendStartDate(e.target.value)}
						/>
					</FormControl>
					<FormControl id="sendEndDate" isRequired mb={4}>
						<FormLabel>Send End Date</FormLabel>
						<Input
							type="date"
							name="sendEndDate"
							value={sendEndDate}
							onChange={(e) => setSendEndDate(e.target.value)}
						/>
					</FormControl>
					<HStack display="flex" justifyContent="space-between">
						<Button type="submit" colorScheme="blue" mt={4}>
							Submit
						</Button>
						<Button
							mt={4}
							colorScheme="red"
							onClick={() => navigate("/messages")}>
							Cancel
						</Button>
					</HStack>
				</Box>
			</Container>
		</Flex>
	);
};

export default MessageForm;
