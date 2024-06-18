import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Flex,
	Heading,
	Spinner,
	HStack,
	Box,
	Text,
	Spacer,
	Container,
	Badge,
} from "@chakra-ui/react";
import IncentiveForm from "../components/IncentiveForm";
import { getIncentiveById, updateIncentive } from "../api";
import NavMenu from "../components/NavMenu";
import { ClientContext } from "../context/ClientContext";

const EditIncentive = () => {
	const { id } = useParams();
	const [incentive, setIncentive] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { selectedClient } = useContext(ClientContext);

	useEffect(() => {
		const fetchIncentive = async () => {
			try {
				const data = await getIncentiveById(id);
				setIncentive(data);
			} catch (error) {
				console.error("Error fetching incentive:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchIncentive();
	}, [id]);

	const handleUpdate = async (data) => {
		try {
			await updateIncentive(id, data);
			console.log("Incentive updated:", data);
			navigate("/incentives");
		} catch (error) {
			console.error("Error updating incentives:", error);
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
					<Heading>Edit Incentive</Heading>
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

			<IncentiveForm initialData={incentive} onSubmit={handleUpdate} />
		</Container>
	);
};

export default EditIncentive;
