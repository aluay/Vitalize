import React, { useState, useContext } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Flex,
	Select,
	useToast,
	Container,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { ClientContext } from "../context/ClientContext";

const RoutineForm = ({ initialData = {}, onSubmit }) => {
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
	const [rules, setRules] = useState(initialData.rules || "step");
	const [status, setStatus] = useState(initialData.status || "active");
	const [startDate, setStartDate] = useState(
		formatDate(initialData.startDate) || ""
	);
	const [endDate, setEndDate] = useState(formatDate(initialData.endDate) || "");
	const [reward, setReward] = useState(initialData.reward || "star");
	const [difficulty, setDifficulty] = useState(
		initialData.difficulty || "easy"
	);
	const [goal, setGoal] = useState(initialData.goal || "");
	const [completionCriteria, setCompletionCriteria] = useState(
		initialData.completionCriteria || ""
	);
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
			rules,
			status,
			startDate,
			endDate,
			reward,
			difficulty,
			goal,
			completionCriteria,
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
					<FormControl id="type" isRequired mt={4}>
						<FormLabel>Rules</FormLabel>
						<Input
							type="text"
							value={rules}
							onChange={(e) => setRules(e.target.value)}
						/>
					</FormControl>
					<FormControl id="status" isRequired mt={4}>
						<FormLabel>Status</FormLabel>
						<Select value={status} onChange={(e) => setStatus(e.target.value)}>
							<option value="active">active</option>
							<option value="inactive">inactive</option>
						</Select>
					</FormControl>
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
					<FormControl id="reward" isRequired mt={4}>
						<FormLabel>Reward</FormLabel>
						<Select value={reward} onChange={(e) => setReward(e.target.value)}>
							<option value="star">Star</option>
							<option value="giftCard">Gift Card</option>
							<option value="ticket">Ticket</option>
						</Select>
					</FormControl>
					<FormControl id="difficulty" isRequired mt={4}>
						<FormLabel>Difficulty</FormLabel>
						<Select
							value={difficulty}
							onChange={(e) => setDifficulty(e.target.value)}>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</Select>
					</FormControl>
					<FormControl id="goal" isRequired>
						<FormLabel>Goal</FormLabel>
						<Input
							type="number"
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
						/>
					</FormControl>
					<FormControl id="completionCriteria" isRequired>
						<FormLabel>Completion Criteria</FormLabel>
						<Input
							type="text"
							value={completionCriteria}
							onChange={(e) => setCompletionCriteria(e.target.value)}
						/>
					</FormControl>
					<HStack display="flex" justifyContent="space-between">
						<Button type="submit" colorScheme="blue" mt={4}>
							Submit
						</Button>
						<Button
							mt={4}
							colorScheme="red"
							onClick={() => navigate("/routines")}>
							Cancel
						</Button>
					</HStack>
				</Box>
			</Container>
		</Flex>
	);
};

export default RoutineForm;
