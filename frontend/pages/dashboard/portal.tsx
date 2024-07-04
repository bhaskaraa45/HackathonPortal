import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react";
import ProtectedRoute from "@/app/components/protectedRoutes";
import CustomHead from "@/app/components/customHead";
import ProbmelStatementComponent from "@/app/components/problemStatement";
import SubmitAnswer from "@/app/components/submitAnswer";
import makeApiCall from "@/app/api/makeCall";
import DashboardLayout from "@/app/components/DashboardLayout";
import RoundSelector from "@/app/components/roundHeading";

interface QuestionData {
    problem: string;
    current_round: number;
    last_submission: number | null;
}

function Portal() {
    const [jsonData, setJsonData] = useState<QuestionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeRound, setActiveRound] = useState(1);

    const getData = async () => {
        setIsLoading(true);
        try {
            const resp = await makeApiCall('question', { method: 'GET' });
            setJsonData(resp.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box>
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />
            <DashboardLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <Flex direction="column" w="100%" h="100vh">
                        {/* <Heading as="h1" size="lg" textAlign="center" mb={4}>
                            Round: {jsonData?.current_round || 'Loading...'}
                        </Heading> */}

                        <RoundSelector activeRound={jsonData?.current_round || 1} onRoundChange={setActiveRound} />

                        <Box flex="1" w="100%" bgColor="#0B0E29" p={4} overflow="auto">
                            <Flex align="center" justifyContent="center" >
                                <Box w="85%">
                                    <ProbmelStatementComponent
                                        isLoading={isLoading}
                                        jsonData={jsonData ? JSON.parse(jsonData.problem) : null}
                                    />
                                </Box>
                            </Flex>
                        </Box>
                        <Flex pt={3} bgColor="#0B0E29" align="center" justifyContent="center" >
                            <Box w="85%">
                                <SubmitAnswer last_submission={jsonData?.last_submission ?? 0} current_round={jsonData?.current_round ?? 1} />
                            </Box>
                        </Flex>

                    </Flex>
                )}
            </DashboardLayout>
        </Box>
    );
}

export default ProtectedRoute(Portal);
