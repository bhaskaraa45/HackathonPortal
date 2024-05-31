import Sidebar from "@/app/components/Sidebar";
import React from "react";
import styles from '../styles/portal.module.css'
import { Box, Flex, Heading } from "@chakra-ui/react";
import MembersList from "@/app/components/team";
import ProtectedRoute from "@/app/components/protectedRoutes";

function MyTeam() {

    const members = [
        { name: 'Neil Sims', email: 'email@gmail.com', isLeader: true },
        { name: 'Bonnie Green', email: 'email@gmail.com', isLeader: false },
        { name: 'Michael Gough', email: 'email@gmail.com', isLeader: false },
        { name: 'Thomas Lean', email: 'email@gmail.com', isLeader: false },
        { name: 'Lana Byrd', email: 'email@gmail.com', isLeader: false },
    ];


    return (
        <div className="dashboardBG">
            <Flex height="100vh">
                <Sidebar isLoading={false}/>
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    <Flex align="center"
                        justify="space-between"
                        flexDirection="column"
                        className="leaderboard">
                        <Heading as="h1" size="lg" textAlign="center" className="heading">
                            TEAM: team_name
                        </Heading>
                        <Heading size="lg" textAlign="center" className="subheading">
                            MEMBERS
                        </Heading>
                        <div className="membersListContainer">
                            <MembersList members={members} />
                        </div>
                    </Flex>
                </Box>
            </Flex>
        </div>
    );
}

export default ProtectedRoute(MyTeam);