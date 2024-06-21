import React, { useState, useContext } from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Select,
	useToast,
	Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { ClientContext } from "../context/ClientContext";

const ChallengeForm = ({ initialData = {}, onSubmit }) => {
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
	const [type, setType] = useState(initialData.type || "step");
	const [status, setStatus] = useState(initialData.status || "inactive");
	const [visibility, setVisibility] = useState(
		initialData.visibility || "hidden"
	);
	const [startDate, setStartDate] = useState(
		formatDate(initialData.startDate) || ""
	);
	const [endDate, setEndDate] = useState(formatDate(initialData.endDate) || "");
	const [reward, setReward] = useState(initialData.reward || "star");
	const [difficulty, setDifficulty] = useState(
		initialData.difficulty || "easy"
	);
	const [goal, setGoal] = useState(initialData.goal || "");
	// const [completionCriteria, setCompletionCriteria] = useState(
	// 	initialData.completionCriteria || ""
	// );

	const [completionCriteriaType, setCompletionCriteriaType] = useState(
		initialData.completionCriteria.type || "step"
	);
	const [completionCriteriaAmount, setCompletionCriteriaAmount] = useState(
		initialData.completionCriteria.amount || ""
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
		console.log(completionCriteriaType, completionCriteriaAmount);
		onSubmit({
			title,
			description,
			type,
			status,
			visibility,
			startDate,
			endDate,
			reward,
			difficulty,
			goal,
			completionCriteriaType,
			completionCriteriaAmount,
			// completionCriteria,
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
					<FormControl id="title" isRequired mb={4}>
						<FormLabel>Title</FormLabel>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
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
					<FormControl id="description" isRequired mt={4}>
						<FormLabel>Description</FormLabel>
						<ReactQuill value={description} onChange={setDescription} />
					</FormControl>
					<FormControl id="type" isRequired mt={4}>
						<FormLabel>Type</FormLabel>
						<Select value={type} onChange={(e) => setType(e.target.value)}>
							<option value="step">step</option>
							<option value="minute">minute</option>
							<option value="calorie">calorie</option>
							<option value="other">other</option>
						</Select>
					</FormControl>
					<FormControl id="status" isRequired mt={4}>
						<FormLabel>Status</FormLabel>
						<Select value={status} onChange={(e) => setStatus(e.target.value)}>
							<option value="active">active</option>
							<option value="inactive">inactive</option>
						</Select>
					</FormControl>
					<FormControl id="visibility" isRequired mt={4}>
						<FormLabel>Visibility</FormLabel>
						<Select
							value={visibility}
							onChange={(e) => setVisibility(e.target.value)}>
							<option value="visible">Visible</option>
							<option value="hidden">Hidden</option>
						</Select>
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
					<FormControl id="type" isRequired>
						<FormLabel>Completion Criteria Type</FormLabel>
						<Select
							value={completionCriteriaType}
							onChange={(e) => setCompletionCriteriaType(e.target.value)}>
							<option value="step">step</option>
							<option value="minute">minute</option>
							<option value="calorie">calorie</option>
							<option value="other">other</option>
						</Select>
					</FormControl>

					<FormControl id="amount" isRequired>
						<FormLabel>Completion Criteria Amount</FormLabel>
						<Input
							type="number"
							value={completionCriteriaAmount}
							onChange={(e) => setCompletionCriteriaAmount(e.target.value)}
						/>
					</FormControl>
					<HStack display="flex" justifyContent="space-between">
						<Button type="submit" colorScheme="blue" mt={4}>
							Submit
						</Button>
						<Button
							mt={4}
							colorScheme="red"
							onClick={() => navigate("/challenges")}>
							Cancel
						</Button>
					</HStack>
				</Box>
			</Container>
		</Flex>
	);
};

export default ChallengeForm;
