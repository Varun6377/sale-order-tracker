import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "gray.900")(props),
        color: mode("black", "white")(props),
      },
    }),
  },
  colors: {
    brand: {
      50: "#e3f2ff",
      100: "#b3d9ff",
      200: "#80c1ff",
      300: "#4da9ff",
      400: "#1a90ff",
      500: "#0077e6",
      600: "#005bb4",
      700: "#003f82",
      800: "#002350",
      900: "#000720",
    },
  },
  fonts: {
    heading: `'Avenir Next', sans-serif`,
    body: `'Avenir Next', sans-serif`,
  },
});

export default theme;
