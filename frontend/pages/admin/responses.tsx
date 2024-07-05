import makeApiCall from "@/app/api/makeCall";
import AdminLayout from "@/app/components/AdminLayout";
import AdminProtectedRoute from "@/app/components/adminProtectedRoute";
import AdminSideBar from "@/app/components/adminSidebar";
import CustomHead from "@/app/components/customHead";
import ResponseTable from "@/app/components/responseTable";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ResponseProp = {
    teamName: string;
    round_one: string | null;
    round_two: string | null;
    round_three: string | null;
    teamId: number;
    current_round: number
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
                current_round: data.current_round
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
        <div >
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Admin Portal of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />

            <AdminLayout>
                {isLoading ? (
                    <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <>
                        < Heading fontSize={{ base: "1.5rem", lg: "2rem" }} color="white" textAlign="center" fontWeight="semibold" mt={{ base: "70px", lg: "36px" }} mb={{ base: "0px", lg: "36px" }}>
                            RESPONSES
                        </Heading>
                        <ResponseTable tableProp={jsonData} />

                        {/* <LeaderboardTable teams={teams} /> */}
                    </>
                )}

            </AdminLayout>

            {/* <Flex height="100vh">
                <AdminSideBar />
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    <Heading as="h1" size="lg" mb="36px" textAlign="center" className="heading">
                        RESPONSES
                    </Heading>
                    <div className='conainerWithMargin'>
                        <ResponseTable tableProp={jsonData} />
                    </div>
                </Box>
            </Flex> */}
        </div>
    );
}

export default AdminProtectedRoute(Responses);