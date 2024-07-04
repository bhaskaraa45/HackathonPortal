import React from 'react';
import { Flex, Image, Stack, Box, useMediaQuery } from '@chakra-ui/react';

interface RoundSelectorProps {
    activeRound: number;
    onRoundChange: (round: number) => void;
}

const RoundSelector: React.FC<RoundSelectorProps> = ({ activeRound, onRoundChange }) => {
    const [isLargerThanBase] = useMediaQuery("(min-width: 580px)");

    return (
        <Box h="120px">
            <Flex height="100%" justify="center" align="center">
                {isLargerThanBase ? (
                    <Stack direction='row' spacing={{ base: "30px", md: "50px", lg: "100px", xl: "160px", "2xl": "220px" }}>
                        <Image
                            _hover={{ cursor: activeRound === 1 ? "pointer" : "not-allowed" }}
                            mt={activeRound === 1 ? "10px" : "0px"}
                            src={activeRound === 1 ? '/rounds/r1-active.svg' : '/rounds/r1.svg'}
                        />
                        <Image
                            _hover={{ cursor: activeRound === 2 ? "pointer" : "not-allowed" }}
                            mt={activeRound === 2 ? "10px" : "0px"}
                            src={activeRound === 2 ? '/rounds/r2-active.svg' : '/rounds/r2.svg'}
                        />
                        <Image
                            _hover={{ cursor: activeRound === 3 ? "pointer" : "not-allowed" }}
                            mt={activeRound === 3 ? "10px" : "0px"}
                            src={activeRound === 3 ? '/rounds/r3-active.svg' : '/rounds/r3.svg'}
                        />
                    </Stack>
                ) : (
                    <Image
                        _hover={{ cursor: "pointer" }}
                        mt="10px"
                        src={activeRound === 1 ? '/rounds/r1-active.svg' : activeRound === 2 ? '/rounds/r2-active.svg' : '/rounds/r3-active.svg'}
                    />
                )}
            </Flex>
        </Box>
    );
};

export default RoundSelector;
