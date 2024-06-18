import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Box,
	Stack,
	Text,
	Heading,
	// useColorModeValue,
	// Flex,
	// Image,
	Button,
} from "@chakra-ui/react";
// import heroImage from "../assets/hero.jpg";

const HomePage = () => {
	return (
		<Box>
			<Box
				py={20}
				textAlign="center"
				backgroundSize="cover"
				backgroundPosition="center">
				<Stack spacing={6} align="center">
					<Heading as="h1" size="2xl">
						Welcome to Vitalize
					</Heading>
					<Text fontSize="xl" maxW="600px">
						Join us and start your journey towards a healthier lifestyle today!
					</Text>
					<Button as={RouterLink} to="/register" colorScheme="blue">
						Sign Up
					</Button>
					{/* <Image src={heroImage} alt="Hero Image" maxW="100%" /> */}
				</Stack>
			</Box>
			{/* <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="xs" borderRadius="md">
				<Heading as="h1" mb={6} textAlign="center">
					Welcome to the Digital Wellbeing App
				</Heading>
				<Stack spacing={4} direction="row" justify="center">
					<Button size='sm' as={RouterLink} to="/login" colorScheme="blue">
						Login
					</Button>
					<Button size='sm' as={RouterLink} to="/register" colorScheme="blue">
						Sign Up
					</Button>
				</Stack>
			</Box> */}
		</Box>
	);
};

export default HomePage;
