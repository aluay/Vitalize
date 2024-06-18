import React, { useState } from "react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from "@chakra-ui/react";

const ProgressModal = ({
	isOpen,
	onClose,
	challengeId,
	challengeType,
	updateProgress,
}) => {
	const [progress, setProgress] = useState("");
	const toast = useToast();

	const handleSubmit = async () => {
		if (!progress) {
			toast({
				title: "Progress required",
				description: "Please enter your progress.",
				status: "warning",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		updateProgress(progress);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Update Progress</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl id="progress" isRequired>
						<FormLabel>
							{challengeType === "step" && "Number of Steps"}
							{challengeType === "minute" && "Number of Minutes"}
							{challengeType === "calorie" && "Number of Calories"}
							{challengeType === "other" && "Please update your progress"}
						</FormLabel>
						<Input
							type="number"
							value={progress}
							onChange={(e) => setProgress(e.target.value)}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={handleSubmit}>
						Submit
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ProgressModal;
