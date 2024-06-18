import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
	Link,
	Select,
	InputGroup,
	InputRightElement,
	InputLeftElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, PhoneIcon } from "@chakra-ui/icons";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [showPassword, setShowPassword] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (confirmPassword === password) {
			try {
				const response = await fetch(
					"http://localhost:5000/api/auth/register",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							username,
							email,
							password,
							firstName,
							lastName,
							gender,
							dateOfBirth,
							phoneNumber,
						}),
					}
				);

				const data = await response.json();
				if (response.ok) {
					toast({
						title: "Registration successful",
						description: "You can now log in.",
						status: "success",
						duration: 5000,
						isClosable: true,
					});
					navigate("/login");
				} else {
					toast({
						title: "Registration failed",
						description: data.message,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}
			} catch (error) {
				console.error("Error:", error);
				toast({
					title: "Registration failed",
					description: "An unexpected error occurred.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} else {
			toast({
				title: "Password Error!",
				description: "Passwords do not match",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex minH={"50vh"} align={"center"} justify={"center"}>
			<Stack spacing={3} mx={"auto"} py={8}>
				<Stack align={"center"}>
					<Heading fontSize={"3xl"} textAlign={"center"}>
						Create Your Account
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"xs"}
					p={8}>
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id="firstName" isRequired>
										<FormLabel>First Name</FormLabel>
										<Input
											variant="filled"
											type="text"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl id="lastName" isRequired>
										<FormLabel>Last Name</FormLabel>
										<Input
											variant="filled"
											type="text"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</FormControl>
								</Box>
							</HStack>
							<Stack>
								<FormControl id="username" isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										variant="filled"
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</FormControl>
								<FormControl id="email" isRequired>
									<FormLabel>Email</FormLabel>
									<Input
										variant="filled"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</FormControl>
								<FormControl id="password" isRequired>
									<FormLabel>Password</FormLabel>
									<InputGroup>
										<Input
											variant="filled"
											type={showPassword ? "text" : "password"}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowPassword((showPassword) => !showPassword)
												}>
												{showPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
								<FormControl id="password" isRequired>
									<FormLabel>Confirm Password</FormLabel>
									<InputGroup>
										<Input
											variant="filled"
											type={confirmPassword ? "text" : "password"}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setConfirmPassword(
														(confirmPassword) => !confirmPassword
													)
												}>
												{confirmPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
								<FormControl id="phoneNumber" isRequired>
									<FormLabel>Phone Number</FormLabel>
									<InputGroup>
										<InputLeftElement pointerEvents="none">
											<PhoneIcon color="gray.300" />
										</InputLeftElement>
										<Input
											variant="filled"
											type="tel"
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</InputGroup>
								</FormControl>
							</Stack>
							<HStack>
								<FormControl id="gender" isRequired>
									<FormLabel>Gender</FormLabel>
									<Select
										variant="filled"
										placeholder="Select gender"
										value={gender}
										onChange={(e) => setGender(e.target.value)}>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</Select>
								</FormControl>
								<FormControl id="dateOfBirth" isRequired>
									<FormLabel>Date of Birth</FormLabel>
									<Input
										variant="filled"
										type="date"
										value={dateOfBirth}
										onChange={(e) => setDateOfBirth(e.target.value)}
									/>
								</FormControl>
							</HStack>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Loading..."
									type="submit"
									colorScheme="blue"
									color={"white"}>
									Sign up
								</Button>
							</Stack>
							<Stack pt={1}>
								<Text align={"center"} fontSize="sm">
									Already have an account?
								</Text>
								<Text align={"center"} fontSize="sm">
									<Link color={"blue.500"} href="/login">
										Sign in
									</Link>
								</Text>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default RegisterPage;
