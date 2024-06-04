import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import styles from "../styles/portal.module.css";
import { Box, Flex, Heading } from "@chakra-ui/react";
import MembersList from "@/app/components/team";
import ProtectedRoute from "@/app/components/protectedRoutes";
import CustomHead from "@/app/components/customHead";
import makeApiCall from "@/app/api/makeCall";

type Member = {
    name: string;
    email: string;
    isLeader: boolean;
};

interface TeamData {
    name: string;
    members_email: string;
    members_name: string;
}

function MyTeam() {
    const [jsonData, setJsonData] = useState<TeamData | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    function parseStringToArray(str: string): string[] {
        return str.slice(1, -1).split(",").map((item) => item.trim());
    }

    const getData = async () => {
        setIsLoading(true);

        try {
            const response = await makeApiCall("team", { method: "GET" });
            setJsonData(response as TeamData);
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

        const parsedEmails = parseStringToArray(jsonData.members_email);
        const parsedNames = parseStringToArray(jsonData.members_name);

        return parsedNames.map((name, index) => ({
            name,
            email: parsedEmails[index],
            isLeader: index === 0,
        }));
    }

    return (
        <div className="dashboardBG">
            <CustomHead
                title="Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI"
                description="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon."
            />

            <Flex height="100vh">
                <Sidebar isLoading={false} />
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>Loading team data...</div>
                    ) : jsonData ? (
                        <>
                            <Flex align="center" justify="space-between" flexDirection="column" className="leaderboard">
                                <Heading as="h1" size="lg" textAlign="center" className="heading">
                                    TEAM: {jsonData.name}
                                </Heading>
                                <Heading size="lg" textAlign="center" className="subheading">
                                    MEMBERS
                                </Heading>
                                <div className="membersListContainer">
                                    <MembersList members={makeMembersList()} />
                                </div>
                            </Flex>
                        </>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center" }}>Error fetching team data. Please try again later.</div>
                    )}
                </Box>
            </Flex>
        </div>
    );
}

// Wrap in ProtectedRoute if needed
export default MyTeam;
