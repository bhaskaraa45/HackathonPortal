import makeApiCall from "@/app/api/makeCall";
import AdminProtectedRoute from "@/app/components/adminProtectedRoute";
import AdminSideBar from "@/app/components/adminSidebar";
import CustomHead from "@/app/components/customHead";
import ResponseTable from "@/app/components/responseTable";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// const exampleTableProp = [
//     {
//         teamName: "Team Alpha",
//         round_one: "https://example.com/round1_alpha",
//         round_two: "https://example.com/round2_alpha",
//         round_three: "https://example.com/round3_alpha",
//         teamId: 1,
//     },
//     {
//         teamName: "Team Beta",
//         round_one: "https://example.com/round1_beta",
//         round_two: "https://example.com/round2_beta",
//         round_three: "https://example.com/round3_beta",
//         teamId: 2,
//     },
//     {
//         teamName: "Team Gamma",
//         round_one: "https://example.com/round1_gamma",
//         round_two: "https://example.com/round2_gamma",
//         round_three: "https://example.com/round3_gamma",
//         teamId: 3,
//     },
// ];

type ResponseProp = {
    teamName: string;
    round_one: string | null;
    round_two: string | null;
    round_three: string | null;
    teamId: number;
};


const Responses: React.FC = () => {
    const [jsonData, setJsonData] = useState<ResponseProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await makeApiCall("responses", { method: "GET" });
            console.log(response.data);

            const parsedData = response.data.map((data: any) => ({
                teamName: data.team_name,
                round_one: data.round_one.String,
                round_two: data.round_two.String,
                round_three: data.round_three.String,
                teamId: data.team_id,
            }));

            setJsonData(parsedData as ResponseProp[]);
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
                        RESPONSES
                    </Heading>
                    <div className='conainerWithMargin'>
                        <ResponseTable tableProp={jsonData} />
                    </div>
                </Box>
            </Flex>
        </div>
    );
}

export default AdminProtectedRoute(Responses);