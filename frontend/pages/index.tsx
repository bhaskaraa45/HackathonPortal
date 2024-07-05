import React, { useEffect, useState } from 'react';
import { Image, Flex, Heading, Text, Stack, Spinner, useBreakpointValue, HStack, Icon, VStack, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import PrimaryButton, { SecondaryButton } from '@/app/components/buttons';
import Countdown from '@/app/components/countdownComponent';
import styles from '../styles/home.module.css';
import TeamsModal from '@/app/components/teamsModal';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [countdownEnded, setCountdownEnded] = useState(false);
    const [targetDate, setTargetDate] = useState<number | null>(null);
    const router = useRouter();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const headingFontSize = useBreakpointValue({ base: "1.75rem", md: "3.3rem" });
    const textFontSize = useBreakpointValue({ base: "1rem", md: "1.5rem" });
    const buttonFontSize = useBreakpointValue({ base: "1rem", md: "1.25rem" });

    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const fetchDate = async () => {
        try {
            const response = await axios.get(`${backendUrl}/date`);
            const date = new Date(response.data).getTime();

            const now = new Date().getTime();
            const distance = date - now;

            if (distance <= 0) {
                setCountdownEnded(true);
            }

            setTargetDate(date);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching date:', error);
        }
    };

    useEffect(() => {
        fetchDate();
    }, [backendUrl]);

    const handleRegisterClick = () => {
        window.location.href = '/register';
    };
    const handleABoutClick = () => {
        window.location.href = '/about';
    };

    if (loading) {
        return (
            <Flex direction="column" align="center" justify="center" height="calc(100vh - 94px)" textAlign="center">
                <Spinner size="xl" />
            </Flex>
        );
    }
    const AfterCountDownEnds = () => (
        <div className={styles.home}>
            <Navbar />
            <div className={styles.maincontent}>

                <HStack>
                    {isLargerThan768 &&
                        <svg width="82" height="79" viewBox="0 0 82 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.9204 9.9741L31.9309 9.96209L31.9421 9.95077L37.6872 4.15182L34.2778 0.710425L28.5486 6.49317C26.6099 8.67566 25.6751 11.0936 25.6751 13.6472C25.6751 16.1989 26.6085 18.5786 28.5482 20.7623L41.9944 34.2596L45.1299 30.8415L31.9421 17.3052C31.9416 17.3048 31.9412 17.3043 31.9408 17.3039C31.5174 16.8764 31.145 16.4698 30.8959 15.8956C30.6476 15.3231 30.5404 14.6301 30.5404 13.6472C30.5404 12.2571 31.0035 11.0257 31.9204 9.9741ZM50.871 13.7182L50.8785 13.7106L50.8864 13.7033L52.8304 11.9019L49.4361 8.47588L47.6695 10.2591C45.7253 12.485 44.7564 14.8665 44.7564 17.4915C44.7564 20.0008 45.7249 22.3461 47.675 24.5381C47.6756 24.5388 47.6762 24.5394 47.6768 24.5401L49.4516 26.4914L52.8304 23.0811L50.8864 21.2796L50.8785 21.2724L50.871 21.2648C49.9214 20.3063 49.4693 19.016 49.4693 17.4915C49.4693 15.9669 49.9214 14.6767 50.871 13.7182ZM37.6739 38.6209L16.6026 17.3146C14.4333 15.3512 12.1146 14.3779 9.63586 14.3779C7.03974 14.3779 4.6485 15.3537 2.48639 17.3077L0.68177 19.2918L3.93142 22.7311L5.89098 20.7532C6.93019 19.7043 8.19809 19.1443 9.63586 19.1443C11.0733 19.1443 12.341 19.704 13.3801 20.7526C13.3803 20.7528 13.3805 20.753 13.3807 20.7532L34.2905 41.783L37.6739 38.6209ZM29.5857 59.5739L81.1765 78.1717L62.7512 26.098L29.5857 59.5739ZM29.9938 46.1314L24.2977 40.382C22.0896 38.417 19.77 37.4436 17.2531 37.4436C14.7326 37.4436 12.3393 38.4197 10.1743 40.3784L4.43531 46.3159L7.73145 49.5795L13.5463 43.8189C13.5469 43.8183 13.5475 43.8178 13.548 43.8172C14.5853 42.771 15.8521 42.21 17.2531 42.21C18.6637 42.21 19.853 42.7785 20.8838 43.8189L26.5843 49.5728L29.9938 46.1314Z" stroke="white" />
                        </svg>}

                    <VStack mx="24px">
                        <Heading fontSize={{ base: "2rem", md: "3rem" }} fontWeight='bold'>WAIT IS OVER!</Heading>
                        <Text fontSize={{ base: "1.3rem", md: "1.5rem" }} mt="12px">Hackathon has already started</Text>
                    </VStack>
                    {isLargerThan768 &&
                        <svg width="82" height="79" viewBox="0 0 82 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.0796 9.9741L50.0691 9.96209L50.0579 9.95077L44.3128 4.15182L47.7222 0.710425L53.4514 6.49317C55.3901 8.67566 56.3249 11.0936 56.3249 13.6472C56.3249 16.1989 55.3915 18.5786 53.4518 20.7623L40.0056 34.2596L36.8701 30.8415L50.0579 17.3052C50.0584 17.3048 50.0588 17.3043 50.0592 17.3039C50.4826 16.8764 50.855 16.4698 51.1041 15.8956C51.3524 15.3231 51.4596 14.6301 51.4596 13.6472C51.4596 12.2571 50.9965 11.0257 50.0796 9.9741ZM31.129 13.7182L31.1215 13.7106L31.1136 13.7033L29.1696 11.9019L32.5639 8.47588L34.3305 10.2591C36.2747 12.485 37.2436 14.8665 37.2436 17.4915C37.2436 20.0008 36.2751 22.3461 34.325 24.5381C34.3244 24.5388 34.3238 24.5394 34.3232 24.5401L32.5484 26.4914L29.1696 23.0811L31.1136 21.2796L31.1215 21.2724L31.129 21.2648C32.0786 20.3063 32.5307 19.016 32.5307 17.4915C32.5307 15.9669 32.0786 14.6767 31.129 13.7182ZM44.3261 38.6209L65.3974 17.3146C67.5667 15.3512 69.8854 14.3779 72.3641 14.3779C74.9603 14.3779 77.3515 15.3537 79.5136 17.3077L81.3182 19.2918L78.0686 22.7311L76.109 20.7532C75.0698 19.7043 73.8019 19.1443 72.3641 19.1443C70.9267 19.1443 69.659 19.704 68.6199 20.7526C68.6197 20.7528 68.6195 20.753 68.6193 20.7532L47.7095 41.783L44.3261 38.6209ZM52.4143 59.5739L0.823471 78.1717L19.2488 26.098L52.4143 59.5739ZM52.0062 46.1314L57.7023 40.382C59.9104 38.417 62.23 37.4436 64.7469 37.4436C67.2674 37.4436 69.6607 38.4197 71.8257 40.3784L77.5647 46.3159L74.2686 49.5795L68.4537 43.8189C68.4531 43.8183 68.4525 43.8178 68.452 43.8172C67.4147 42.771 66.1479 42.21 64.7469 42.21C63.3363 42.21 62.147 42.7785 61.1162 43.8189L55.4157 49.5728L52.0062 46.1314Z" stroke="white" />
                        </svg>}

                </HStack>
                <Stack direction='column' spacing={5} mt={{ base: "40px", md: "54px" }} align="center">
                    <PrimaryButton
                        isLoading={false}
                        onClick={() => { router.push('/dashboard') }}
                        h="54px"
                        w="201px"
                        fontSize={buttonFontSize}
                        fontWeight="500"
                        text='Go to Portal'
                        fontWeightH="500"
                    />
                    <SecondaryButton
                        isLoading={false}
                        onClick={handleABoutClick}
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

    const BeforeCountDownEnds = () => (
        <div className={styles.home}>
            <Navbar />
            <div className={styles.maincontent}>
                <Heading fontSize={headingFontSize} fontWeight={700}>Buckle up !</Heading>
                <Text fontSize={textFontSize} mt={{ base: "30px", md: "62px" }}>Hackathon will start in :</Text>
                {targetDate && <Countdown targetDate={targetDate} />}
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
                        onClick={handleABoutClick}
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

    return countdownEnded ? <AfterCountDownEnds /> : <BeforeCountDownEnds />;
}
