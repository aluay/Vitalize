import React, { useContext } from "react";
import {
	Flex,
	Heading,
	HStack,
	Grid,
	Box,
	Text,
	Spacer,
	Container,
	Badge,
	GridItem,
} from "@chakra-ui/react";
import NavMenu from "../components/NavMenu";
import ClientDropdown from "../components/ClientDropdown";
import { ClientContext } from "../context/ClientContext";

const Dashboard = () => {
	const { selectedClient } = useContext(ClientContext);

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
						<Heading>Dashboard</Heading>
					</Box>
					<Spacer />
					<Text as="b">
						Selected client:{" "}
						<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
					</Text>
				</Flex>
				<HStack mb="2">
					<Spacer />
					<ClientDropdown />
					<NavMenu />
				</HStack>

				<Flex
					borderRadius="8"
					alignSelf="stretch"
					bg="gray.50"
					direction="column">
					<Grid
						templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
						gap="4"
						spacing="auto"
						p="4">
						<GridItem bg="blue.100" p="4" borderRadius="8">
							<Text size="xs">Total Users:</Text>
							<Text fontSize="lg" as="b">
								548,868
							</Text>
						</GridItem>
						<GridItem bg="purple.100" p="4" borderRadius="8">
							<Text size="xs">Active Challenges:</Text>
							<Text fontSize="lg" as="b">
								362
							</Text>
						</GridItem>
						<GridItem bg="red.100" p="4" borderRadius="8">
							<Text size="xs">User Engagement:</Text>
							<Text fontSize="lg" as="b">
								78%
							</Text>
						</GridItem>
						<GridItem bg="green.100" p="4" borderRadius="8">
							<Text size="xs">New Sign-ups:</Text>
							<Text fontSize="lg" as="b">
								785
							</Text>
						</GridItem>
					</Grid>
				</Flex>
			</Container>
		</Flex>
	);
};

export default Dashboard;
