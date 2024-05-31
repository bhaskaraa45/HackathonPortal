import React from "react";
import styles from '../styles/portal.module.css'
import Sidebar from "@/app/components/Sidebar";
import { Box, ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import ProtectedRoute from "@/app/components/protectedRoutes";


function Portal() {
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

export default ProtectedRoute(Portal)