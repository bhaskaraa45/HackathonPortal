import React from "react";
import styles from '../styles/portal.module.css'
import Sidebar from "@/app/components/Sidebar";
import { Box, ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
    breakpoints: {
        sm: "360px",
        md: "920px",
        lg: "1024px",
        xl: "1440px",
    },
    styles: {
        global: (props: any) => ({
            body: {
                color: mode("black", "white")(props),
                fontSize: "1.25rem",
            },
        }),
    },
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        bg: "grey.500",
        cardBg: "grey.500",
    },
    fonts: {
        heading: "Raleway",
        body: "Montserrat",
    },
});

export default function Home() {
    return (

        <div className="dashboardBG">
            <Flex height="100vh">
                <Sidebar />
                <Box flex="1" ml="16rem" className="contentContainer">

                </Box>
            </Flex>
        </div>
    );
}