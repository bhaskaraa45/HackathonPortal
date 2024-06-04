import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import { TeamsTable } from '@/app/components/teamsTable';
import AdminProtectedRoute from '@/app/components/adminProtectedRoute';
import makeApiCall from '@/app/api/makeCall';

type Team = {
    teamName: string;
    membersName: string[];
    membersEmail: string[];
    currentRound: number;
    teamId: number;
};

const AdminPage: React.FC = () => {
    const [jsonData, setJsonData] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await makeApiCall("teams", { method: "GET" });
            console.log(response);

            const parsedData = response.data.map((team: any) => ({
                teamName: team.name,
                membersName: team.members_name,
                membersEmail: team.members_email,
                currentRound: team.current_round,
                teamId: team.id,
            }));

            setJsonData(parsedData as Team[]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

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
                        <TeamsTable tableProp={jsonData} />
                    </div>
                </Box>
            </Flex>
        </div>
    );
};

export default AdminProtectedRoute(AdminPage);
