import Sidebar from '@/app/components/Sidebar';
import React from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProtectedRoute from '@/app/components/protectedRoutes';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import { TeamsTable } from '@/app/components/teamsTable';

const exampleProps = [
    {
        teamName: "Team Alpha",
        membersName: ["Alice", "Bob", "Charlie"],
        membersEmail: ["alice@example.com", "bob@example.com", "charlie@example.com"],
        currentRound: 2,
        teamId: 1,
    },
    {
        teamName: "Team Beta",
        membersName: ["Dave", "Eve", "Frank"],
        membersEmail: ["dave@example.com", "eve@example.com", "frank@example.com"],
        currentRound: 1,
        teamId: 2,
    },
    {
        teamName: "Team Gamma",
        membersName: ["Grace", "Heidi", "Ivan"],
        membersEmail: ["grace@example.com", "heidi@example.com", "ivan@example.com"],
        currentRound: 1,
        teamId: 3,
    },
];

const AdminPage: React.FC = () => {
    return (
        <div className="dashboardBG">
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <Flex height="100vh">
                <AdminSideBar isLoading={false} />
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    <Heading as="h1" size="lg" mb="36px" textAlign="center" className="heading">
                        ALL TEAMS
                    </Heading>
                    <div className='conainerWithMargin'>
                        <TeamsTable tableProp={exampleProps} />
                    </div>
                </Box>
            </Flex>
        </div>
    );
};

export default AdminPage;
