import Sidebar from '@/app/components/PortalSidebar';
import React from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';

const teams = [
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
    { rank: 1, name: 'Team A', currentRound: 'Round 1' },
    { rank: 2, name: 'Team B', currentRound: 'Round 2' },
    { rank: 3, name: 'Team C', currentRound: 'Round 3' },
];

const LeaderboardPage: React.FC = () => {
    return (
        <>
            <div style={{ height: "36px" }}></div>
            <Flex>
                <Sidebar />
                <Box flex="1" ml="16rem" overflowY="auto">
                    <Heading as="h1" size="lg" mt="4" mb="4" textAlign="center" className='heading'>
                        LEADERBOARD
                    </Heading>
                    <div style={{ height: "36px" }}></div>
                    <div className='container'>
                        <Table teams={teams} />
                    </div>
                </Box>
            </Flex>
        </>

    );
};

export default LeaderboardPage;
