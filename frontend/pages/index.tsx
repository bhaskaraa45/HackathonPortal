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

                        {!isLargerThan768 && <svg width="150" height="84" viewBox="0 0 150 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M118.08 14.9741L118.069 14.9621L118.058 14.9508L112.313 9.15182L115.722 5.71042L121.451 11.4932C123.39 13.6757 124.325 16.0936 124.325 18.6472C124.325 21.1989 123.392 23.5786 121.452 25.7623L108.006 39.2596L104.87 35.8415L118.058 22.3052C118.058 22.3048 118.059 22.3043 118.059 22.3039C118.483 21.8764 118.855 21.4698 119.104 20.8956C119.352 20.3231 119.46 19.6301 119.46 18.6472C119.46 17.2571 118.996 16.0257 118.08 14.9741ZM99.129 18.7182L99.1215 18.7106L99.1136 18.7033L97.1696 16.9019L100.564 13.4759L102.331 15.2591C104.275 17.485 105.244 19.8665 105.244 22.4915C105.244 25.0008 104.275 27.3461 102.325 29.5381C102.324 29.5388 102.324 29.5394 102.323 29.5401L100.548 31.4914L97.1696 28.0811L99.1136 26.2796L99.1215 26.2724L99.129 26.2648C100.079 25.3063 100.531 24.016 100.531 22.4915C100.531 20.9669 100.079 19.6767 99.129 18.7182ZM112.326 43.6209L133.397 22.3146C135.567 20.3512 137.885 19.3779 140.364 19.3779C142.96 19.3779 145.352 20.3537 147.514 22.3077L149.318 24.2918L146.069 27.7311L144.109 25.7532C143.07 24.7043 141.802 24.1443 140.364 24.1443C138.927 24.1443 137.659 24.704 136.62 25.7526C136.62 25.7528 136.619 25.753 136.619 25.7532L115.709 46.783L112.326 43.6209ZM120.414 64.5739L68.8235 83.1717L87.2488 31.098L120.414 64.5739ZM120.006 51.1314L125.702 45.382C127.91 43.417 130.23 42.4436 132.747 42.4436C135.267 42.4436 137.661 43.4197 139.826 45.3784L145.565 51.3159L142.269 54.5795L136.454 48.8189C136.453 48.8183 136.453 48.8178 136.452 48.8172C135.415 47.771 134.148 47.21 132.747 47.21C131.336 47.21 130.147 47.7785 129.116 48.8189L123.416 54.5728L120.006 51.1314Z" stroke="white" />
                            <path d="M22.4672 6.97499L22.4776 6.96298L22.4888 6.95165L26.4516 2.94307L24.2452 0.711206L20.3001 4.70197C18.9521 6.22405 18.3068 7.90341 18.3068 9.67397C18.3068 11.4425 18.9506 13.0949 20.2996 14.6182L29.699 24.0738L31.7205 21.8653L22.4888 12.369C22.4883 12.3685 22.4878 12.368 22.4872 12.3674C22.1865 12.0631 21.9064 11.7587 21.7188 11.3254C21.5319 10.8935 21.4554 10.3798 21.4554 9.67397C21.4554 8.65353 21.7957 7.74685 22.4672 6.97499ZM35.8776 9.62221L35.8851 9.61461L35.8929 9.60734L37.1582 8.43234L34.967 6.21583L33.825 7.37105C32.4715 8.92539 31.8033 10.5795 31.8033 12.399C31.8033 14.1365 32.4711 15.7656 33.8306 17.2973C33.8312 17.2979 33.8317 17.2985 33.8323 17.2991L34.9825 18.5665L37.1582 16.3657L35.8929 15.1907L35.8851 15.1834L35.8776 15.1758C35.1734 14.4635 34.8442 13.5092 34.8442 12.399C34.8442 11.2889 35.1734 10.3345 35.8776 9.62221ZM26.4383 27.3728L11.6417 12.3785C10.13 11.0083 8.52489 10.3375 6.81561 10.3375C5.02236 10.3375 3.36693 11.0109 1.86248 12.3716L0.68108 13.6733L2.78326 15.903L4.06245 14.6091C4.82288 13.8398 5.75648 13.4251 6.81561 13.4251C7.87474 13.4251 8.80833 13.8398 9.56877 14.6091L24.258 29.4149L26.4383 27.3728ZM21.1905 42.1701L57.1771 55.1711L44.3247 18.7684L21.1905 42.1701ZM21.0099 32.7007L17.0851 28.7305C15.5457 27.3588 13.9397 26.6878 12.2034 26.6878C10.4635 26.6878 8.80605 27.3616 7.29862 28.727L3.34213 32.8293L5.46856 34.9393L9.47721 30.9594C9.47779 30.9589 9.47836 30.9583 9.47894 30.9577C10.2374 30.1912 11.1699 29.7754 12.2034 29.7754C13.2465 29.7754 14.1238 30.1988 14.8758 30.9594L18.8035 34.9326L21.0099 32.7007Z" stroke="white" />
                        </svg>
                        }

                        <Heading mt={isLargerThan768 ? '0' : '32px'} fontSize={{ base: "2rem", md: "3rem" }} fontWeight='bold'>WAIT IS OVER!</Heading>
                        <Text fontSize={{ base: "1.3rem", md: "1.5rem" }} mt={{base:"4px", md:"12px"}}>Hackathon has already started</Text>
                    </VStack>
                    {isLargerThan768 &&
                        <svg width="82" height="79" viewBox="0 0 82 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.0796 9.9741L50.0691 9.96209L50.0579 9.95077L44.3128 4.15182L47.7222 0.710425L53.4514 6.49317C55.3901 8.67566 56.3249 11.0936 56.3249 13.6472C56.3249 16.1989 55.3915 18.5786 53.4518 20.7623L40.0056 34.2596L36.8701 30.8415L50.0579 17.3052C50.0584 17.3048 50.0588 17.3043 50.0592 17.3039C50.4826 16.8764 50.855 16.4698 51.1041 15.8956C51.3524 15.3231 51.4596 14.6301 51.4596 13.6472C51.4596 12.2571 50.9965 11.0257 50.0796 9.9741ZM31.129 13.7182L31.1215 13.7106L31.1136 13.7033L29.1696 11.9019L32.5639 8.47588L34.3305 10.2591C36.2747 12.485 37.2436 14.8665 37.2436 17.4915C37.2436 20.0008 36.2751 22.3461 34.325 24.5381C34.3244 24.5388 34.3238 24.5394 34.3232 24.5401L32.5484 26.4914L29.1696 23.0811L31.1136 21.2796L31.1215 21.2724L31.129 21.2648C32.0786 20.3063 32.5307 19.016 32.5307 17.4915C32.5307 15.9669 32.0786 14.6767 31.129 13.7182ZM44.3261 38.6209L65.3974 17.3146C67.5667 15.3512 69.8854 14.3779 72.3641 14.3779C74.9603 14.3779 77.3515 15.3537 79.5136 17.3077L81.3182 19.2918L78.0686 22.7311L76.109 20.7532C75.0698 19.7043 73.8019 19.1443 72.3641 19.1443C70.9267 19.1443 69.659 19.704 68.6199 20.7526C68.6197 20.7528 68.6195 20.753 68.6193 20.7532L47.7095 41.783L44.3261 38.6209ZM52.4143 59.5739L0.823471 78.1717L19.2488 26.098L52.4143 59.5739ZM52.0062 46.1314L57.7023 40.382C59.9104 38.417 62.23 37.4436 64.7469 37.4436C67.2674 37.4436 69.6607 38.4197 71.8257 40.3784L77.5647 46.3159L74.2686 49.5795L68.4537 43.8189C68.4531 43.8183 68.4525 43.8178 68.452 43.8172C67.4147 42.771 66.1479 42.21 64.7469 42.21C63.3363 42.21 62.147 42.7785 61.1162 43.8189L55.4157 49.5728L52.0062 46.1314Z" stroke="white" />
                        </svg>}

                </HStack>
                <Stack direction='column' spacing={5} mt={{ base: "32px", md: "42px" }} align="center">
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
