import React, { useState, useEffect, useContext, useCallback } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react";
import { getRulesByClient, createRule, updateRule, deleteRule } from "../api";
import { ClientContext } from "../context/ClientContext";

const RuleForm = () => {
	const [rules, setRules] = useState([]);
	const [selectedRule, setSelectedRule] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingRule, setEditingRule] = useState(null);
	const [formData, setFormData] = useState({
		entity: "",
		attribute: "",
		operator: "",
		value: "",
		logicalConditions: [],
	});
	const toast = useToast();
	const { selectedClient } = useContext(ClientContext);
	const client = selectedClient;
	const token = localStorage.getItem("token");

	const fetchRules = useCallback(async () => {
		if (!selectedClient) return;

		try {
			const data = await getRulesByClient(selectedClient._id, token);
			setRules(data);
		} catch (error) {
			console.error(
				"Error fetching challenges:",
				error.response ? error.response.data : error.message
			);
		}
	}, [selectedClient, token]);

	useEffect(() => {
		fetchRules();
	}, [fetchRules]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			if (editingRule) {
				await updateRule(editingRule._id, formData, token);
				toast({
					title: "Rule updated successfully",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			} else {
				const ruleData = { ...formData, client: client };
				await createRule(ruleData, token);
				toast({
					title: "Rule created successfully",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
			fetchRules();
			setFormData({
				entity: "",
				attribute: "",
				operator: "",
				value: "",
				logicalConditions: [],
			});
			setEditingRule(null);
		} catch (error) {
			console.error("Error saving rule:", error);
			toast({
				title: "Error saving rule",
				description: error.response?.data?.message || "An error occurred",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleCancel = () => {
		setEditingRule(null);
		setFormData({
			entity: "",
			attribute: "",
			operator: "",
			value: "",
			logicalConditions: [],
		});
	};

	const handleEdit = (rule) => {
		setEditingRule(rule);
		setFormData(rule);
	};

	const openDialog = (rule) => {
		setSelectedRule(rule);
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedRule(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async () => {
		if (!selectedClient) return;
		try {
			await deleteRule(selectedRule);
			fetchRules();
			toast({
				title: "Rule deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			closeDialog();
		} catch (error) {
			toast({
				title: "Error deleting rule.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error deleting rule:", error);
			closeDialog();
		}
	};

	return (
		<Box>
			<form onSubmit={handleSubmit}>
				<FormControl id="entity" isRequired mb={4}>
					<FormLabel>Entity</FormLabel>
					<Select
						name="entity"
						value={formData.entity}
						onChange={handleInputChange}>
						<option value="">Select entity</option>
						<option value="users">Users</option>
						<option value="clients">Clients</option>
						<option value="challenges">Challenges</option>
						<option value="incentives">Incentives</option>
					</Select>
				</FormControl>
				<FormControl id="attribute" isRequired mb={4}>
					<FormLabel>Attribute</FormLabel>
					<Input
						type="text"
						name="attribute"
						value={formData.attribute}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl id="operator" isRequired mb={4}>
					<FormLabel>Operator</FormLabel>
					<Select
						name="operator"
						value={formData.operator}
						onChange={handleInputChange}>
						<option value="">Select operator</option>
						<option value=">">Greater than</option>
						<option value="<">Less than</option>
						<option value=">=">Greater than or equal to</option>
						<option value="<=">Less than or equal to</option>
						<option value="==">Equal to</option>
						<option value="!=">Not equal to</option>
					</Select>
				</FormControl>
				<FormControl id="value" isRequired mb={4}>
					<FormLabel>Value</FormLabel>
					<Input
						type="text"
						name="value"
						value={formData.value}
						onChange={handleInputChange}
					/>
				</FormControl>
				<Button type="submit" colorScheme="blue">
					{editingRule ? "Update Rule" : "Create Rule"}
				</Button>
				{editingRule && (
					<Button ml={4} onClick={() => handleCancel()}>
						Cancel
					</Button>
				)}
			</form>

			<Table mt={8}>
				<Thead>
					<Tr>
						<Th>Entity</Th>
						<Th>Attribute</Th>
						<Th>Operator</Th>
						<Th>Value</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{rules.map((rule) => (
						<Tr key={rule._id}>
							<Td>{rule.entity}</Td>
							<Td>{rule.attribute}</Td>
							<Td>{rule.operator}</Td>
							<Td>{rule.value}</Td>
							<Td>
								<Button
									colorScheme="blue"
									size="sm"
									onClick={() => handleEdit(rule)}
									mr={2}>
									Edit
								</Button>
								<Button
									colorScheme="red"
									size="sm"
									onClick={() => openDialog(rule._id)}>
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
						<AlertDialogHeader fontWeight="bold">Delete Rule</AlertDialogHeader>

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
	);
};

export default RuleForm;
