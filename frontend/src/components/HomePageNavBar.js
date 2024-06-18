import React from "react";
import {
	Box,
	Flex,
	Link,
	Button,
	HStack,
	IconButton,
	useDisclosure,
	Stack,
	Image,
	useColorModeValue,
	useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import logoImage from "../assets/logo.png";
const HomePageNavbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} width={"100%"} px={4}>
			<Flex h={16} alignItems="center" justifyContent="space-between">
				<Image src={logoImage} width={"50px"} />

				<Flex alignItems="center" display={{ base: "flex", md: "none" }}>
					<Button onClick={toggleColorMode} m={5} bg={"none"}>
						{colorMode === "light" ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -2 24 24"
								width="28"
								fill="currentColor">
								<path d="M12.253.335A10.086 10.086 0 0 0 8.768 8c0 4.632 3.068 8.528 7.232 9.665A9.555 9.555 0 0 1 9.742 20C4.362 20 0 15.523 0 10S4.362 0 9.742 0c.868 0 1.71.117 2.511.335z"></path>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-2 -1.5 24 24"
								width="28"
								fill="currentColor">
								<path d="M10 15.565a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-9-7h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.808a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 3.494l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.908a1 1 0 0 1 1.414-1.414zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z"></path>
							</svg>
						)}
					</Button>
					<IconButton
						size="md"
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label="Open Menu"
						display={{ base: "flex", md: "none" }}
						onClick={isOpen ? onClose : onOpen}
						colorScheme="blue"
						color={"white"}
					/>
				</Flex>

				<HStack
					spacing={8}
					alignItems="center"
					display={{ base: "none", md: "flex" }}>
					<Link as={RouterLink} to="/">
						Home
					</Link>
					<Link as={RouterLink} to="#">
						About
					</Link>
					<Link as={RouterLink} to="#">
						Pricing
					</Link>
				</HStack>

				<Flex alignItems="center" display={{ base: "none", md: "flex" }}>
					<HStack spacing={4}>
						<Button onClick={toggleColorMode} m={5} bg={"none"}>
							{colorMode === "light" ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-4 -2 24 24"
									width="28"
									fill="currentColor">
									<path d="M12.253.335A10.086 10.086 0 0 0 8.768 8c0 4.632 3.068 8.528 7.232 9.665A9.555 9.555 0 0 1 9.742 20C4.362 20 0 15.523 0 10S4.362 0 9.742 0c.868 0 1.71.117 2.511.335z"></path>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-2 -1.5 24 24"
									width="28"
									fill="currentColor">
									<path d="M10 15.565a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-9-7h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.808a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 3.494l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.908a1 1 0 0 1 1.414-1.414zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z"></path>
								</svg>
							)}
						</Button>
						<Button
							as={RouterLink}
							to="/login"
							colorScheme="blue"
							variant="outline">
							Sign In
						</Button>
						<Button
							as={RouterLink}
							to="/register"
							colorScheme="blue"
							color={"white"}
							variant="solid">
							Sign Up
						</Button>
					</HStack>
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as="nav" spacing={4}>
						<Link as={RouterLink} to="/" onClick={onClose}>
							Home
						</Link>
						<Link as={RouterLink} to="#" onClick={onClose}>
							About
						</Link>
						<Link as={RouterLink} to="#" onClick={onClose}>
							Pricing
						</Link>
						<Link as={RouterLink} to="/login" onClick={onClose}>
							Sign In
						</Link>
						<Link as={RouterLink} to="/register" onClick={onClose}>
							Sign Up
						</Link>
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

export default HomePageNavbar;
