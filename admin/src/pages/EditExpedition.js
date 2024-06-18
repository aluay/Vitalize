import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Flex,
	Heading,
	Spinner,
	Container,
	Box,
	Badge,
	Spacer,
	Text,
	HStack,
} from "@chakra-ui/react";
import ExpeditionForm from "../components/ExpeditionForm";
import { getExpeditionById, updateExpedition } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const EditExpedition = () => {
	const { id } = useParams();
	const [expedition, setExpedition] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	useEffect(() => {
		const fetchExpedition = async () => {
			try {
				const data = await getExpeditionById(id);
				setExpedition(data);
			} catch (error) {
				console.error("Error fetching expedition:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchExpedition();
	}, [id]);

	const handleUpdate = async (data) => {
		try {
			await updateExpedition(id, data);
			console.log("Expedition updated:", data);
			navigate("/expeditions");
		} catch (error) {
			console.error("Error updating expedition:", error);
		}
	};

	if (loading) {
		return <Spinner size="xl" />;
	}

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
					<Heading>Edit Expedition</Heading>
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

			<ExpeditionForm initialData={expedition} onSubmit={handleUpdate} />
		</Container>
	);
};

export default EditExpedition;
