// pages/about.tsx
import React, { useState } from 'react';
import { Box, Flex, Text, Heading, Stack, Image, Center, Spacer } from '@chakra-ui/react';
import Navbar from '@/app/components/Navbar';
import FaqSection from '@/app/components/FAQ';
import Timeline from '@/app/components/timeline';

const AboutPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuClick = (newMenuState: boolean) => {
        setMenuOpen(newMenuState);
    };

    return (
        <div>
            <Navbar />
            <Box mt={{ base: "64px", lg: "94px" }} px={{ base: "20px", md: "60px", lg: "120px" }}>
                <Flex direction="column" justifyContent="center" align="center" minHeight="100vh">
                    {/* About the Hackathon Section */}
                    <Box maxW={{ base: "95%", md: "85%" }} minW={{ base: "95%", md: "70%" }}>
                        <Flex
                            mx={{ base: "0px", md: "120px" }}
                            direction={{ base: "column", md: "row" }}
                            align="start"
                            mt="120px"
                            justifyContent="center"
                        >
                            <Box minW="45%" maxW="45%" flex="1">
                                <Heading fontSize="2.25rem" fontWeight="semibold" color="white" mb="32px">About the Hackathon</Heading>
                                <Text color="white" fontWeight="400" fontSize="1.25rem">
                                    The Hackathon, conducted by E-cell Hyderabad in collaboration with NPCI, aims to foster new technological innovations in retail payment systems. This initiative focuses on enhancing operational efficiency and expanding the reach of payment systems through cutting-edge technology.
                                </Text>
                            </Box>
                            <Spacer />
                            <Box ml="120px" mt={{ base: "20px", md: "0" }}>
                                <Image height="354px" src="img1.png" alt="Relevant image" borderRadius="md" />
                            </Box>
                        </Flex>
                    </Box>

                    {/* Calling All Innovators Section */}
                    <Box maxW={{ base: "95%", md: "85%" }} minW={{ base: "95%", md: "70%" }}>
                        <Flex
                            mx={{ base: "0px", md: "120px" }}
                            direction={{ base: "column", md: "row" }}
                            align="center"
                            mt="120px"
                            justifyContent="center"
                        >
                            <Box>
                                <Image height="444px" src="img2.png" alt="Relevant image" borderRadius="md" />
                            </Box>
                            <Spacer />
                            <Box minW="50%" maxW="50%" flex="1" mt={{ base: "20px", md: "0" }}>
                                <Heading fontSize="2.25rem" fontWeight="semibold" color="white" mb="32px">Calling All Innovators!</Heading>
                                <Text color="white" fontWeight="400" fontSize="1.25rem">
                                    Join the NPCI Hackathon to develop groundbreaking product ideas and acquire valuable entrepreneurial skills in the dynamic field of fintech. The hackathon follows a three-stage format and is open to students from any academic background, with a particular focus on 3rd and 4th-year students.
                                </Text>
                                <Text color="white" fontWeight="400" fontSize="1.25rem" mt="4">
                                    Finalists will have the unique opportunity to present their solutions in person to the official members of NPCI. Winning teams will receive exciting opportunities from NPCI, making this hackathon a transformative experience in the fintech industry. Seize this chance to innovate and excel!
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    {/* Event Timeline Section */}
                    <Box maxW={{ base: "95%", md: "85%" }} minW={{ base: "95%", md: "70%" }}>
                        <Flex direction="column" align="start" my="50px" width="100%">
                            <Heading fontSize="2.25rem" fontWeight="semibold" color="white" mb="32px">Event Timeline</Heading>
                            <Text color="white" fontWeight="500" fontSize="1.5rem">
                                Hackathon Consists of 3 Rounds:
                            </Text>
                        </Flex>
                        <Flex direction="column" align="center" my="50px" width="100%">
                                <Timeline />
                            
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </div>
    );
};

export default AboutPage;
