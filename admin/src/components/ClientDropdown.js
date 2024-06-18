import React, { useContext, useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { ClientContext } from "../context/ClientContext";
import { getClients } from "../api";

const ClientDropdown = () => {
	const { selectedClient, setSelectedClient } = useContext(ClientContext);
	const [clients, setClients] = useState([]);

	useEffect(() => {
		fetchClients();
	}, []);

	const fetchClients = async () => {
		try {
			const data = await getClients();
			setClients(data);
		} catch (error) {
			console.error("Error fetching clients:", error);
		}
	};

	const handleClientChange = (e) => {
		const clientId = e.target.value;
		const client = clients.find((client) => client._id === clientId);
		setSelectedClient(client);
	};

	return (
		<Select
			fontSize="sm"
			value={selectedClient._id}
			onChange={handleClientChange}
			width="200px">
			{clients.map((client) => (
				<option key={client._id} value={client._id}>
					{client.name}
				</option>
			))}
		</Select>
	);
};

export default ClientDropdown;
