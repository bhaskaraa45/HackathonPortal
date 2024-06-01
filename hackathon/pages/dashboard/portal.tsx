import React from "react";
import styles from '../styles/portal.module.css'
import Sidebar from "@/app/components/Sidebar";
import { Box, ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import ProtectedRoute from "@/app/components/protectedRoutes";
import CustomHead from "@/app/components/customHead";


function Portal() {
    return (

        <div className="dashboardBG">
            <CustomHead title='Dashboard | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />

            <Flex height="100vh">
                <Sidebar isLoading={false} />
                <Box flex="1" ml="16rem" className="contentContainer">
                </Box>
            </Flex>
        </div>
    );
}

export default ProtectedRoute(Portal)