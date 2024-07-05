import React from 'react';
import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';

type Team = {
    rank: number;
    name: string;
    currentRound: number;
};

type LeaderboardProps = {
    teams: Team[];
};

const LeaderboardTable: React.FC<LeaderboardProps> = ({ teams }) => {
    return (
        <Box width="100%" px="18px" mt="18px" borderRadius="md">
            <VStack spacing="4" width="100%">
                <HStack height="64px" width="100%" justifyContent="space-between" bg="#5134A4" p="4" px={{ base: 4, md: 8 }} borderRadius="8px">
                    <Box w="54px" >
                        <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Rank</Text>
                    </Box>
                    <Box>
                        <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Team name</Text>
                    </Box>
                    <Box w="68px">
                        <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Round</Text>
                    </Box>
                </HStack>
                {teams.map((team, index) => (
                    <HStack
                        h="64px"
                        px={8}
                        key={index}
                        width="100%"
                        justifyContent="space-between"
                        bg="#101232"
                        p="4"
                        borderRadius="8px"
                        border="2px solid"
                        borderColor="#1D1E37"
                    >
                        <Box display="flex" justifyContent="center" alignContent="center" w="54px">
                            <Text noOfLines={1} fontSize="1.25rem" fontWeight="medium" color="white">{team.rank}</Text>
                        </Box>
                        <Box>
                            <Text noOfLines={1} fontSize="1.25rem" fontWeight="medium" color="white">{team.name}</Text>
                        </Box>
                        <Box display="flex" justifyContent="center" alignContent="center" w="68px">
                            <Text noOfLines={1} fontSize="1.25rem" fontWeight="medium" color="white">{team.currentRound}</Text>
                        </Box>
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
};

export default LeaderboardTable;

