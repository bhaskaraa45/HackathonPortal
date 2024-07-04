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
                <HStack height="64px" width="100%" justifyContent="space-between" bg="#5134A4" p="4" px={8} borderRadius="8px">
                    <Text fontSize="1.25rem" fontWeight="medium" color="white">Rank</Text>
                    <Text fontSize="1.25rem" fontWeight="medium" color="white">Team name</Text>
                    <Text fontSize="1.25rem" fontWeight="medium" color="white">Round</Text>
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
                        <Text fontSize="1.25rem" fontWeight="medium" ml="32px" color="white">{team.rank}</Text>
                        <Text fontSize="1.25rem" fontWeight="medium" color="white">{team.name}</Text>
                        <Text fontSize="1.25rem" fontWeight="medium" mr="36px" color="white">{team.currentRound}</Text>
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
};

export default LeaderboardTable;

