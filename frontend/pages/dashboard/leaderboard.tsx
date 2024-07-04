import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProtectedRoute from '@/app/components/protectedRoutes';
import CustomHead from '@/app/components/customHead';
import makeApiCall from '@/app/api/makeCall';
import DashboardLayout from '@/app/components/DashboardLayout';
import Table from '@/app/components/Table';

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
            const data: Team[] = resp.data as Team[];
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
            <DashboardLayout>
                <Heading as="h1" size="lg" mb="36px" textAlign="center" className="heading">
                    LEADERBOARD
                </Heading>
                <div className='containerWithMargin'>
                    <Table teams={teams} />
                </div>
            </DashboardLayout>
        </div>
    );
};

export default ProtectedRoute(LeaderboardPage);
