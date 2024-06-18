import React, { createContext, useState, useEffect } from "react";

// Create a context for the selected client
export const ClientContext = createContext();

const DEFAULT_CLIENT = {
	_id: "666192edcd0294fa84b3ffaf",
	name: "Vitalize",
};

export const ClientProvider = ({ children }) => {
	const [selectedClient, setSelectedClient] = useState(() => {
		// Retrieve the initial state from local storage if it exists, otherwise use default client ID
		const savedClient = localStorage.getItem("selectedClient");
		return savedClient ? JSON.parse(savedClient) : DEFAULT_CLIENT;
	});

	// Persist selected client to local storage whenever it changes
	useEffect(() => {
		if (selectedClient) {
			localStorage.setItem("selectedClient", JSON.stringify(selectedClient));
		} else {
			localStorage.removeItem("selectedClient");
		}
	}, [selectedClient]);

	const resetSelectedClient = () => {
		setSelectedClient(DEFAULT_CLIENT);
		localStorage.removeItem("selectedClient");
	};

	return (
		<ClientContext.Provider
			value={{ selectedClient, setSelectedClient, resetSelectedClient }}>
			{children}
		</ClientContext.Provider>
	);
};
