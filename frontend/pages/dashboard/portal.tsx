import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { Box, Flex, Heading } from "@chakra-ui/react";
import ProtectedRoute from "@/app/components/protectedRoutes";
import CustomHead from "@/app/components/customHead";
import ProbmelStatementComponent from "@/app/components/problemStatement";
import SubmitAnswer from "@/app/components/submitAnswer";
import makeApiCall from "@/app/api/makeCall";

interface QuestionData {
    problem: string;
    current_round: number;
    last_submission: number | null;
}

function Portal() {
    const [jsonData, setJsonData] = useState<QuestionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);

        try {
            const resp = await makeApiCall('question', { method: 'GET' });
            setJsonData(resp.data);
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
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />

            <Flex height="100vh">
                <Sidebar isLoading={false} />
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    <Flex align="center" justify="space-between" flexDirection="column" className="leaderboard">
                        <Heading as="h1" size="lg" textAlign="center" className="heading">
                            Round: {jsonData?.current_round || 'Loading...'}
                        </Heading>
                        <div className="membersListContainer">
                            <ProbmelStatementComponent
                                isLoading={isLoading}
                                jsonData={jsonData ? JSON.parse(jsonData.problem) : null}
                            />
                        </div>
                    </Flex>
                </Box>
            </Flex>
            <SubmitAnswer last_submission={jsonData?.last_submission ?? 0} current_round={jsonData?.current_round ?? 1} />
        </div>
    );
}

export default ProtectedRoute(Portal);
