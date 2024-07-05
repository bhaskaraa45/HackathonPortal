import React, { useEffect, useState } from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import AdminProtectedRoute from '@/app/components/adminProtectedRoute';
import makeApiCall from '@/app/api/makeCall';
import AdminLayout from '@/app/components/AdminLayout';
import LeaderboardTable from '@/app/components/Table';

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
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="dashboardBG">
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Admin Portal of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <AdminLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <>
                        < Heading fontSize={{ base: "1.5rem", lg: "2rem" }} color="white" textAlign="center" fontWeight="semibold" mt={{ base: "70px", lg: "36px" }} mb={{ base: "0px", lg: "36px" }}>
                            LEADERBOARD
                        </Heading>
                        <LeaderboardTable teams={teams} />
                    </>
                )}
            </AdminLayout>
        </div>
    );
};

export default AdminProtectedRoute(LeaderboardPage);
