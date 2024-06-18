import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import customTheme from "./theme";

// Create a root
const container = document.getElementById("root");
const root = createRoot(container);

// Initial render
root.render(
	<ChakraProvider theme={customTheme} cssVarsRoot="body">
		<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
		<App />
	</ChakraProvider>
);
