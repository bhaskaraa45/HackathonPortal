import React from "react";
import styles from '../styles/portal.module.css'
import Sidebar from "@/app/components/Sidebar";
import { Box, ChakraProvider, Flex, Heading, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import ProtectedRoute from "@/app/components/protectedRoutes";
import CustomHead from "@/app/components/customHead";
import ProbmelStatementComponent from "@/app/components/problemStatement";
import SubmitAnswer from "@/app/components/submitAnswer";


function Portal() {
    const current_round = 1 // TODO: change this
    return (
        <div className="dashboardBG">
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />

            <Flex height="100vh">
                <Sidebar isLoading={false} />
                <Box minHeight="100vh" flex="1" className="contentContainer">

                    <Flex align="center"
                        justify="space-between"
                        flexDirection="column"
                        className="leaderboard">
                        <Heading as="h1" size="lg" textAlign="center" className="heading">
                            Round: {current_round}
                        </Heading>
                        <div className="membersListContainer">
                            <ProbmelStatementComponent />
                        </div>
                    </Flex>
                </Box>
            </Flex>
            <SubmitAnswer />

        </div>
    );
}

export default ProtectedRoute(Portal);