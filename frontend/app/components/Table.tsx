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
        <Box width="100%" mx="auto" p="8" borderRadius="md">
            <VStack spacing="4" width="100%">
                <HStack height="64px" width="100%" justifyContent="space-between" bg="#5134A4" p="4" px={{ base: 4, md: 8 }} borderRadius="8px">
                    <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Rank</Text>
                    <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Team name</Text>
                    <Text fontSize="1.25rem" fontWeight="medium" color="white" noOfLines={1}>Round</Text>
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
                        <Text fontSize="1.25rem" fontWeight="medium" ml={{base: "24px", md:"32px"}} color="white">{team.rank}</Text>
                        <Text fontSize="1.25rem" fontWeight="medium" color="white">{team.name}</Text>
                        <Text fontSize="1.25rem" fontWeight="medium" mr={{base: "28px", md:"36px"}} color="white">{team.currentRound}</Text>
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
};

export default LeaderboardTable;

