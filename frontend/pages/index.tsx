import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, Stack, Spinner } from '@chakra-ui/react';
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
    }, []);

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
        checkSession();
    };

    return (
        <div className={styles.home}>
            <Navbar />
            {loading ? (
                <Flex direction="column" align="center" justify="center" height="calc(100vh - 94px)" textAlign="center">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <div className={styles.maincontent}>
                    <Heading fontSize="3.3rem" fontWeight={700}>Buckle up !</Heading>
                    <Text fontSize="1.5rem" mt="62px">Hackathon will start in :</Text>
                    <Flex h="120px" marginTop="22px" align="center" justify="center" mt={0} flexDirection="column">
                        <Flex fontSize="6rem" fontWeight="bold">
                            <Box textAlign="center" mx={2}>
                                <Text h="118px">{countdownD}</Text>
                                <Text fontSize="1.1rem" fontWeight="normal">Days</Text>
                            </Box>
                            <Box textAlign="center" mx={2}>
                                <Text>:</Text>
                            </Box>
                            <Box textAlign="center" mx={2}>
                                <Text h="118px">{countdownH}</Text>
                                <Text fontSize="1.1rem" fontWeight="normal">Hours</Text>
                            </Box>
                            <Box textAlign="center" mx={2}>
                                <Text>:</Text>
                            </Box>
                            <Box textAlign="center" mx={2}>
                                <Text h="118px">{countdownM}</Text>
                                <Text fontSize="1.1rem" fontWeight="normal">Minutes</Text>
                            </Box>
                            <Box textAlign="center" mx={2}>
                                <Text>:</Text>
                            </Box>
                            <Box textAlign="center" mx={2}>
                                <Text h="118px">{countdownS}</Text>
                                <Text fontSize="1.1rem" fontWeight="normal">Seconds</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Stack direction="row" spacing={5} mt="80px">
                        <PrimaryButton
                            onClick={handleRegisterClick}
                            h="54px"
                            w="201px"
                            fontSize="1.25rem"
                            fontWeight="medium"
                            text='Register now'
                        />
                        <SecondaryButton
                            onClick={handleRegisterClick}
                            h="54px"
                            w="235px"
                            fontSize="1.25rem"
                            fontWeight="medium"
                            text='About Hackathon'
                        />
                    </Stack>
                </div>
            )}
        </div>
    );
}
