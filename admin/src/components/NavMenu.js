import React, { useContext } from "react";
import {
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
} from "@chakra-ui/react";
import {
	HamburgerIcon,
	StarIcon,
	InfoIcon,
	TimeIcon,
	BellIcon,
	SettingsIcon,
	CalendarIcon,
	ViewIcon,
	CloseIcon,
	EmailIcon,
} from "@chakra-ui/icons";
import Logout from "../utils/Logout";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../context/ClientContext";

const SidebarContent = () => {
	const menuItems = [
		{ name: "Dashboard", icon: <StarIcon /> },
		{ name: "Challenges", icon: <TimeIcon /> },
		{ name: "Routines", icon: <CalendarIcon /> },
		{ name: "Expeditions", icon: <ViewIcon /> },
		{ name: "Incentives", icon: <BellIcon /> },
		{ name: "Messages", icon: <EmailIcon /> },
		{ name: "Client Info", icon: <BellIcon /> },
		{ name: "Users", icon: <InfoIcon /> },
		{ name: "Tools", icon: <SettingsIcon /> },
		{ name: "Plans", icon: <CalendarIcon /> },
		{ name: "Logs", icon: <ViewIcon /> },
	];

	const navigate = useNavigate();
	const { resetSelectedClient } = useContext(ClientContext);

	const handleLogout = (navigate) => {
		resetSelectedClient();
		Logout(navigate);
	};

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuList>
				{menuItems.map((item, i) => (
					<MenuItem
						as="a"
						key={i}
						icon={item.icon}
						href={`/${item.name.toLowerCase().replace(/\s/g, "")}`}>
						{item.name}
					</MenuItem>
				))}
				<Box>
					<MenuItem
						_hover={{
							bg: "red.100",
						}}
						icon={<CloseIcon />}
						onClick={() => handleLogout(navigate)}>
						Logout
					</MenuItem>
				</Box>
			</MenuList>
		</Menu>
	);
};

const NavMenu = () => {
	return <SidebarContent />;
};

export default NavMenu;
