import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	useToast,
	Heading,
} from "@chakra-ui/react";
import { loginUser } from "../api";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { user, token } = await loginUser({ username, password });
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", token);
			navigate("/dashboard");
		} catch (error) {
			toast({
				title: "Login failed",
				description: error.response?.data?.message || "An error occurred",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			h="100vh"
			direction="column">
			<Heading>Login</Heading>
			<Box as="form" onSubmit={handleSubmit} maxW="xs">
				<FormControl id="username" isRequired>
					<Input
						borderRadius={0}
						mt={4}
						placeholder="Username"
						type="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormControl>
				<FormControl id="password" isRequired>
					<Input
						borderRadius={0}
						mt={4}
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormControl>
				<Button
					type="submit"
					colorScheme="blue"
					w="100%"
					mt={4}
					borderRadius={0}>
					Login
				</Button>
			</Box>
		</Flex>
	);
};

export default Login;
