import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import TeamsTable from '@/app/components/teamsTable';
import AdminProtectedRoute from '@/app/components/adminProtectedRoute';
import makeApiCall from '@/app/api/makeCall';
import AdminLayout from '@/app/components/AdminLayout';

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
        <div>
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Admin Portal of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <AdminLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <>
                        < Heading fontSize={{ base: "1.5rem", lg: "2rem" }} color="white" textAlign="center" fontWeight="semibold" mt={{ base: "70px", lg: "36px" }} mb={{ base: "0px", lg: "36px" }}>
                            ALL TEAMS
                        </Heading>

                        <TeamsTable tableProp={jsonData} />
                    </>
                )}
            </AdminLayout>

        </div>
    );
};

export default AdminProtectedRoute(AdminPage);
