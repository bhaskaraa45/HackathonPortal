import React from 'react';
import { Box, Flex, Link, Button, Image, Spacer, Text, Container } from '@chakra-ui/react';
import PrimaryButton from './buttons';

const Navbar = () => {
    return (
        <Box bg="#08091C" h="94px" color="#F3F3F3">
            <Flex alignItems="center" justifyContent="center" h="100%">
                <Image ml="80px" src="logo.png" alt="Logo" h="42px" />
                <Spacer />
                <Flex alignItems="center" fontWeight="normal" color="white" fontSize="1rem" fontFamily="Montserrat, sans-serif">
                    <Flex alignItems="center" fontWeight="normal" color="white" fontSize="1rem" fontFamily="Montserrat, sans-serif">
                        <Link _hover={{ "fontWeight": "bold", textDecoration: "underline" }} href="/" mx="20px" w="51px" textAlign="center">Home</Link>
                        <Link _hover={{ "fontWeight": "bold", textDecoration: "underline" }} href="/dashboard" mx="20px" w="92px" textAlign="center">Dashboard</Link>
                        <Link _hover={{ "fontWeight": "bold", textDecoration: "underline" }} href="/about-hackathon" mx="20px" w="149px" textAlign="center">About Hackathon</Link>
                        <Link _hover={{ "fontWeight": "bold", textDecoration: "underline" }} href="/register" mx="20px" w="72px" textAlign="center">Register</Link>
                        <Link _hover={{ "fontWeight": "bold", textDecoration: "underline" }} href="/faqs" mx="20px" w="48px" textAlign="center">FAQs</Link>
                        <Link href="/ecell-website" mx="20px" w="120px" textAlign="center">E-cell Website</Link>
                        <Link href="/npci-website" mx="20px" w="115px" textAlign="center">NPCI Website</Link>
                    </Flex>
                    <Box
                        ml="20px"
                        mr="80px"
                    >

                        <PrimaryButton
                            onClick={() => { }}
                            h={"40px"}
                            w={"104px"}
                            fontSize='1rem'
                            fontWeight='600'
                            text='Sign in'
                            fontWeightH='600'
                        />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
