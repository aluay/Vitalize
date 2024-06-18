import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const toast = useToast();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();
			if (response.ok) {
				login(data.token);
				toast({
					title: "Login successful",
					description: "You are now logged in.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				navigate("/dashboard");
			} else {
				toast({
					title: "Login failed",
					description: data.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Login failed",
				description: "An unexpected error occurred.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex minH={"50vh"} align={"center"} justify={"center"}>
			<form onSubmit={handleSubmit}>
				<Stack spacing={3} mx={"auto"} py={8}>
					<Stack align={"center"}>
						<Heading fontSize={"3xl"} textAlign={"center"}>
							Sign in to Your Account
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"xs"}
						p={8}>
						<Stack spacing={4}>
							<FormControl id="username" isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									variant="filled"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<Input
									variant="filled"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>
							<Stack spacing={10}>
								<Stack
									direction={{ base: "column", sm: "row" }}
									align={"start"}
									justify={"space-between"}>
									<Checkbox>Remember me</Checkbox>
									<Link color={"blue.500"}>Forgot password?</Link>
								</Stack>
								<Button type="submit" colorScheme="blue" color={"white"}>
									Sign in
								</Button>
							</Stack>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"} fontSize="sm">
								<Link color={"blue.500"} href="/register">
									Create an account
								</Link>
							</Text>
						</Stack>
					</Box>
				</Stack>
			</form>
		</Flex>
	);
};

export default LoginPage;
