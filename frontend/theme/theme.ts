import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#06081A',
      },
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

export default customTheme;
