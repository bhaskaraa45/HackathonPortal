import Sidebar from '@/app/components/Sidebar';
import React from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProtectedRoute from '@/app/components/protectedRoutes';

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
            <Flex height="100vh">
                <Sidebar isLoading={false}/>
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

export default ProtectedRoute(LeaderboardPage);
