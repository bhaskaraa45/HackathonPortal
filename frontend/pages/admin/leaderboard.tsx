import Sidebar from '@/app/components/Sidebar';
import React from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProtectedRoute from '@/app/components/protectedRoutes';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import AdminProtectedRoute from '@/app/components/adminProtectedRoute';

const teams = [
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
];

const LeaderboardPage: React.FC = () => {
    return (
        <div className="dashboardBG">
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />

            <Flex height="100vh">
                <AdminSideBar isLoading={false} />
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    <Heading as="h1" size="lg" mb="36px" textAlign="center" className="heading">
                        LEADERBOARD
                    </Heading>
                    <div className='conainerWithMargin'>
                        <Table teams={teams} />
                    </div>
                </Box>
            </Flex>
        </div>
    );
};

export default (LeaderboardPage);
// export default AdminProtectedRoute(LeaderboardPage);
