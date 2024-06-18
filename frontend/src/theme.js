import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "system",
	useSystemColorMode: true,
};
const breakpoints = {
	base: "0px",
	sm: "320px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
	"2xl": "1536px",
};
const customTheme = extendTheme({
	fonts: {
		heading: "Open Sans, sans-serif",
		body: "Roboto, sans-serif",
	},
	styles: {
		global: {
			"html, body": {
				fontSmooth: "always",
				WebkitFontSmoothing: "antialiased",
				MozOsxFontSmoothing: "grayscale",
			},
		},
	},
	config,
	breakpoints,
});

export default customTheme;
