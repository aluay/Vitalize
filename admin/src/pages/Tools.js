import React, { useContext } from "react";
import {
	Flex,
	Container,
	Box,
	Heading,
	Spacer,
	Text,
	Badge,
	HStack,
	Tabs,
	Tab,
	TabPanel,
	TabPanels,
	TabList,
	// IconButton,
} from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";
import NavMenu from "../components/NavMenu";
// import { useNavigate } from "react-router-dom";
import { ClientContext } from "../context/ClientContext";
import RuleForm from "../components/RuleForm";

const Tools = () => {
	//const navigate = useNavigate();
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
						<Heading>Tools</Heading>
					</Box>
					<Spacer />
					<Text as="b">
						Selected client:{" "}
						<Badge colorScheme="red">{selectedClient.name}</Badge>{" "}
					</Text>
				</Flex>
				<HStack mb="2">
					<Spacer />
					<NavMenu />
				</HStack>
				<Flex
					borderRadius="8"
					alignSelf="stretch"
					bg="gray.50"
					direction="column"
					p="2">
					<Tabs>
						<TabList>
							<Tab _selected={{ color: "white", bg: "blue.500" }}>Rules</Tab>
							<Tab _selected={{ color: "white", bg: "blue.400" }}>Formulas</Tab>
							<Tab _selected={{ color: "white", bg: "blue.400" }}>Upload</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<RuleForm />
							</TabPanel>
							<TabPanel>
								<p>Two!</p>
							</TabPanel>
							<TabPanel>
								<p>Three!</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Flex>
			</Container>
		</Flex>
	);
};

export default Tools;
