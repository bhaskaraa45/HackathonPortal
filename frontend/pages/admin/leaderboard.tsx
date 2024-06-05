import React, { useEffect, useState } from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import AdminProtectedRoute from '@/app/components/adminProtectedRoute';
import makeApiCall from '@/app/api/makeCall';

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
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Admin Portal of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />

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

export default AdminProtectedRoute(LeaderboardPage);
