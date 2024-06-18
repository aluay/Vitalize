import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
	fonts: {
		heading: "Open Sans, sans-serif",
		body: "Roboto, sans-serif",
	},
	styles: {
		global: {
			body: {
				fontSmooth: "always",
				WebkitFontSmoothing: "antialiased",
				MozOsxFontSmoothing: "grayscale",
				textRendering: "optimizeLegibility",
				fontFeatureSettings: "'ss0', 'ss1'",
				letterSpacing: "0.02em",
				lineHeight: "1.5",
				textTransform: "none",
			},
		},
	},
});

export default customTheme;
