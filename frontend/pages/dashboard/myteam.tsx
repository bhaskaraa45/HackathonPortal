import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import MembersList from "@/app/components/team";
import ProtectedRoute from "@/app/components/protectedRoutes";
import CustomHead from "@/app/components/customHead";
import makeApiCall from "@/app/api/makeCall";
import DashboardLayout from "@/app/components/DashboardLayout";

type Member = {
    name: string;
    email: string;
    isLeader: boolean;
};

interface TeamData {
    name: string;
    members_email: string[];
    members_name: string[];
}

function MyTeam() {
    const [jsonData, setJsonData] = useState<TeamData | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);

        try {
            const response = await makeApiCall("team", { method: "GET" });
            setJsonData(response.data as TeamData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    function makeMembersList(): Member[] {
        if (!jsonData) return [];

        return jsonData.members_name.map((name, index) => ({
            name,
            email: jsonData.members_email[index],
            isLeader: index === 0,
        }));
    }

    return (
        <div>
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />
            <DashboardLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : jsonData ? (
                    <>
                        <Flex mt="36px" align="center" justify="space-between" flexDirection="column">
                            <Stack direction="row">
                                <Text fontWeight="500" color="white" fontSize="2rem" textAlign="center" >
                                    Team name -
                                </Text>
                                <Text fontSize="2rem" color="white" textAlign="center" fontWeight="bold">{jsonData.name}</Text>
                            </Stack>
                            <Box mt="48px" width={{base: "95%", md: "60%", lg: "54%%", "2xl": "48%"}}>
                                <Text mb="12px" fontSize="1.5rem" color="white" textAlign="start" fontWeight="semibold" >
                                    Members
                                </Text>
                                <MembersList members={makeMembersList()} />

                            </Box>

                        </Flex>
                    </>
                ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>Error fetching team data. Please try again later.</div>
                )}
            </DashboardLayout>
        </div>
    );
}

export default ProtectedRoute(MyTeam);
