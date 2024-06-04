import Sidebar from '@/app/components/Sidebar';
import React, { useEffect, useState } from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProtectedRoute from '@/app/components/protectedRoutes';
import CustomHead from '@/app/components/customHead';
import makeApiCall from '@/app/api/makeCall';

const demo = [
    { rank: 1, name: 'Team A', currentRound: 1 },
    { rank: 2, name: 'Team B', currentRound: 2 },
    { rank: 3, name: 'Team C', currentRound: 3 },
];

type Team = {
    rank: number;
    name: string;
    currentRound: number;
};

const LeaderboardPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const resp = await makeApiCall('leaderboard', { method: 'GET' });
            const data: Team[] = resp as Team[];
            console.log(demo)
            console.log(data)
            setTeams(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="dashboardBG">
            <CustomHead title='Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <Flex height="100vh">
                <Sidebar isLoading={false} />
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
