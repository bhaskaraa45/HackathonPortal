import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';

const Countdown: React.FC<{ targetDate: number }> = ({ targetDate }) => {
    const [countdownD, setCountdownDay] = useState('00');
    const [countdownH, setCountdownHour] = useState('00');
    const [countdownM, setCountdownMin] = useState('00');
    const [countdownS, setCountdownSec] = useState('00');
    const height = useBreakpointValue({ base: "48px", md: "118px" });
    const labelSize = useBreakpointValue({ base: "0.8rem", md: "1.1rem" });
    const countdownFontSize = useBreakpointValue({ base: "2.5rem", md: "6rem" });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setCountdownDay('00');
                setCountdownHour('00');
                setCountdownMin('00');
                setCountdownSec('00');
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdownDay(`${days < 10 ? '0' + days : days}`);
                setCountdownHour(`${hours < 10 ? '0' + hours : hours}`);
                setCountdownMin(`${minutes < 10 ? '0' + minutes : minutes}`);
                setCountdownSec(`${seconds < 10 ? '0' + seconds : seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <Flex h={{ base: "60px", md: "120px" }} marginTop={{ base: "0px", md: "2px" }} align="center" justify="center" mt={0} flexDirection="column">
            <Flex fontSize={countdownFontSize} fontWeight="bold">
                <Box textAlign="center" mx={2}>
                    <Text h={height}>{countdownD}</Text>
                    <Text fontSize={labelSize} fontWeight="normal">Days</Text>
                </Box>
                <Box textAlign="center" mx={2}>
                    <Text>:</Text>
                </Box>
                <Box textAlign="center" mx={2}>
                    <Text h={height}>{countdownH}</Text>
                    <Text fontSize={labelSize} fontWeight="normal">Hours</Text>
                </Box>
                <Box textAlign="center" mx={2}>
                    <Text>:</Text>
                </Box>
                <Box textAlign="center" mx={2}>
                    <Text h={height}>{countdownM}</Text>
                    <Text fontSize={labelSize} fontWeight="normal">Minutes</Text>
                </Box>
                <Box textAlign="center" mx={2}>
                    <Text>:</Text>
                </Box>
                <Box textAlign="center" mx={2}>
                    <Text h={height}>{countdownS}</Text>
                    <Text fontSize={labelSize} fontWeight="normal">Seconds</Text>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Countdown;
