import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import SignOutModal from './signOutModal';
import makeApiCall from '../api/makeCall';
import router from 'next/router';
import CustomModal from './customModal';

type ResponseProp = {
    teamName: string;
    round_one: string | null;
    round_two: string | null;
    round_three: string | null;
    teamId: number;
    current_round: number;
};

type FinalProp = {
    tableProp: ResponseProp[];
};

interface CustomApiError extends Error {
    status?: number;
    data?: any;
}


const ResponseTable: React.FC<FinalProp> = ({ tableProp }) => {
    const [isPromoteVis, setIsPromoteVis] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<number>();
    const [moreRound, setMoreRound] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isButtonLoading, setisButtonLoading] = useState<boolean>(false);


    const onPromoteConfirm = async () => {
        setisButtonLoading(true);
        try {
            await makeApiCall("promote", { method: "POST", body: { "team_id": selectedTeam } });
            setIsPromoteVis(false)
            router.reload();
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsPromoteVis(false)
            if ((error as CustomApiError)?.status as number > 400) {
                setErrorMessage((error as CustomApiError).data.message);
                setIsError(true);
            }

        } finally {
            setisButtonLoading(false)
        }
        console.log(`PROMOTED ID: ${selectedTeam}`)
    }

    const handlePromoteModal = (id: number, r: number) => {
        setSelectedTeam(id)
        console.log(r)
        if (r > 2) {
            setMoreRound(true)
        } else {
            setIsPromoteVis(true);
        }
    }

    const redirectToLink = (url: string) => {
        window.open(url, "_blank");
    }

    return (
        <>
            <CustomModal
                description={errorMessage}
                title="Error!"
                onClose={() => { setIsError(false) }}
                isOpen={isError}
            />
            <SignOutModal
                isLoading={isButtonLoading}
                isVisible={isPromoteVis}
                title={"Are you sure you want to promote this team to next round?"}
                onClose={() => {
                    setIsPromoteVis(false);
                }}
                onConfirm={onPromoteConfirm}
            />

            <SignOutModal
                isVisible={moreRound}
                title={"This team is already in round 3, they cannot be promoted. Ignore the YES button."}
                onClose={() => {
                    setMoreRound(false)
                }}
                onConfirm={() => { setMoreRound(false) }}
            />

            <Box width="100%" mx="auto" p="8" borderRadius="md">
                <VStack spacing="4" width="100%">
                    <HStack height="64px" width="100%" justifyContent="space-between" bg="#5134A4" p="4" borderRadius="8px">

                        <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                            <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Team</Text>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                            <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Round 1</Text>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                            <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Round 2</Text>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                            <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Round 3</Text>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                            <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Promote</Text>
                        </Box>
                    </HStack>
                    {tableProp.map((resp, index) => (
                        <HStack
                            h="64px"
                            // px={8}
                            key={index}
                            width="100%"
                            justifyContent="space-between"
                            bg="#101232"
                            p="4"
                            borderRadius="8px"
                            border="2px solid"
                            borderColor="#1D1E37"
                        >
                            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                <Text fontSize="1rem" fontWeight="semibold" color="white" noOfLines={1}>{resp.teamName}</Text>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                {resp.round_one && <Text onClick={() => { redirectToLink(resp.round_one ?? '') }} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>Open</Text>}
                                {!resp.round_one && <Text fontSize="1rem" fontWeight="normal" color="#707392" noOfLines={1}>No Submission</Text>}
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                    {resp.round_two && <Text onClick={() => { redirectToLink(resp.round_two ?? '') }} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>Open</Text>}
                                    {!resp.round_two && <Text fontSize="1rem" fontWeight="normal" color="#707392" noOfLines={1}>No Submission</Text>}
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                    {resp.round_three && <Text onClick={() => { redirectToLink(resp.round_three ?? '') }} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>Open</Text>}
                                    {!resp.round_three && <Text fontSize="1rem" fontWeight="normal" color="#707392" noOfLines={1}>No Submission</Text>}
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" minW="180px" maxW="180px">
                                <Text onClick={() => handlePromoteModal(resp.teamId, resp.current_round)} _hover={{ cursor: "pointer", textDecoration: "underline" }} fontSize="1rem" fontWeight="normal" color="#5465FF" noOfLines={1}>Promote</Text>
                            </Box>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </>

    );
};

export default ResponseTable;


