import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, Stack, Spinner, useBreakpointValue } from '@chakra-ui/react';
import Session from 'supertokens-auth-react/recipe/session';
import { getSessionUser } from '@/app/api/auth';
import { useRouter } from 'next/router';
import styles from '../styles/home.module.css';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import PrimaryButton, { SecondaryButton } from '@/app/components/buttons';

export default function Home() {
    const [countdownD, setCountdownDay] = useState('00');
    const [countdownH, setCountdownHour] = useState('00');
    const [countdownM, setCountdownMin] = useState('00');
    const [countdownS, setCountdownSec] = useState('00');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const headingFontSize = useBreakpointValue({ base: "1.75rem", md: "3.3rem" });
    const textFontSize = useBreakpointValue({ base: "1rem", md: "1.5rem" });
    const countdownFontSize = useBreakpointValue({ base: "2.5rem", md: "6rem" });
    const buttonFontSize = useBreakpointValue({ base: "1rem", md: "1.25rem" });
    const height = useBreakpointValue({ base: "48px", md: "118px" });
    const labelSize = useBreakpointValue({ base: "0.8rem", md: "1.1rem" });

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const response = await axios.get(`${backendUrl}/date`);
                const targetDate = new Date(response.data).getTime();

                const interval = setInterval(() => {
                    const now = new Date().getTime();
                    const distance = targetDate - now;

                    if (distance < 0) {
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

                setLoading(false); // Set loading to false after data is fetched

                return () => clearInterval(interval);
            } catch (error) {
                console.error('Error fetching date:', error);
            }
        };

        fetchDate();
    }, [backendUrl]);

    const checkSession = async () => {
        if (await Session.doesSessionExist()) {
            const user = await getSessionUser();
            if (user.isRegisterd) {
                user.isAdmin ? router.replace('/admin') : router.replace('/dashboard');
                return;
            }
        } else {
            router.replace('/login');
        }
    };

    const handleRegisterClick = () => {
        window.location.href = '/register';
    };

    if (loading) {
        return (
            <Flex direction="column" align="center" justify="center" height="calc(100vh - 94px)" textAlign="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <div className={styles.home}>
            <Navbar />
            <div className={styles.maincontent}>
                <Heading fontSize={headingFontSize} fontWeight={700}>Buckle up !</Heading>
                <Text fontSize={textFontSize} mt={{ base: "30px", md: "62px" }}>Hackathon will start in :</Text>
                <Flex h="120px" marginTop={{ base: "10px", md: "22px" }} align="center" justify="center" mt={0} flexDirection="column">
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
                <Stack direction={{ base: "column", md: "row" }} spacing={5} mt={{ base: "40px", md: "80px" }} align="center">
                    <PrimaryButton
                        isLoading={false}
                        onClick={handleRegisterClick}
                        h="54px"
                        w="201px"
                        fontSize={buttonFontSize}
                        fontWeight="500"
                        text='Register now'
                        fontWeightH="500"
                    />
                    <SecondaryButton
                        isLoading={false}
                        onClick={handleRegisterClick}
                        h="54px"
                        w="235px"
                        fontSize={buttonFontSize}
                        fontWeight="medium"
                        text='About Hackathon'
                        fontWeightH="medium"
                    />
                </Stack>
            </div>
        </div>
    );
}
