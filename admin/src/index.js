import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { ClientProvider } from "./context/ClientContext";
import customTheme from "./theme";

// Create a root
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<ChakraProvider theme={customTheme} cssVarsRoot="body">
			<ClientProvider>
				<App />
			</ClientProvider>
		</ChakraProvider>
	</React.StrictMode>
);
