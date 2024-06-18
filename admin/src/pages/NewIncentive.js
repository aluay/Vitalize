import React, { useContext } from "react";
import {
	Flex,
	Heading,
	useToast,
	Container,
	Box,
	Badge,
	Text,
	Spacer,
	HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import IncentiveForm from "../components/IncentiveForm";
import { createIncentive } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const NewIncentive = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	const handleSubmit = async (data) => {
		try {
			await createIncentive(data);
			toast({
				title: "Incentive created.",
				description: "The new incentive has been created successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/incentives");
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error creating the incentive.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			console.error("Error creating incentive:", error);
		}
	};

	return (
		<Container maxW="1280px">
			<Flex
				fontSize="sm"
				pt="2"
				pb="2"
				align="center"
				justify="space-between"
				wrap="wrap"
				w="100%">
				<Box>
					<Heading>Create New Incentive</Heading>
				</Box>
				<Spacer />
				<Text as="b">
					Selected client:{" "}
					<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
				</Text>
			</Flex>
			<HStack>
				<Spacer />
				<NavMenu />
			</HStack>

			<IncentiveForm initialData={{}} onSubmit={handleSubmit} />
		</Container>
	);
};

export default NewIncentive;
