import React, { useState } from 'react';
import { Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Image, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PrimaryButton from './buttons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Box bg="#08091C" h={{ base: "64px", lg: "94px" }} color="#F3F3F3">
      <Flex alignItems="center" justifyContent="space-between" h="100%" px={{ base: "20px", lg: "80px" }}>
        <Image src="logo.png" alt="Logo" h="42px" />

        <Flex display={{ base: "none", lg: "flex" }} alignItems="center" fontWeight="normal" color="white" fontSize="1rem" fontFamily="Montserrat, sans-serif">
          <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/" mx="20px" w="51px" textAlign="center">Home</Link>
          <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/dashboard" mx="20px" w="92px" textAlign="center">Dashboard</Link>
          <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/about-hackathon" mx="20px" w="149px" textAlign="center">About Hackathon</Link>
          <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/register" mx="20px" w="72px" textAlign="center">Register</Link>
          <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/faqs" mx="20px" w="48px" textAlign="center">FAQs</Link>
          <Link href="/ecell-website" mx="20px" w="120px" textAlign="center">E-cell Website</Link>
          <Link href="/npci-website" mx="20px" w="115px" textAlign="center">NPCI Website</Link>
          <PrimaryButton
            onClick={() => { }}
            h={"40px"}
            w={"104px"}
            fontSize='1rem'
            fontWeight='600'
            text='Sign in'
            fontWeightH='600'
          />
        </Flex>

        <IconButton
          display={{ base: "flex", lg: "none" }}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={handleMenuClick}
          color="white"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          size="lg"
        />
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bg="#08091C" color="white">
            <DrawerHeader borderBottomWidth="1px">
              <Flex justifyContent="space-between" alignItems="center">
                <Image src="logo.png" alt="Logo" h="42px" />
                <IconButton
                  aria-label="Close Menu"
                  icon={<CloseIcon />}
                  onClick={onClose}
                  color="white"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" alignItems="center" fontWeight="normal" fontSize="1rem" fontFamily="Montserrat, sans-serif">
                <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/" mb="20px" textAlign="center">Home</Link>
                <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/dashboard" mb="20px" textAlign="center">Dashboard</Link>
                <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/about-hackathon" mb="20px" textAlign="center">About Hackathon</Link>
                <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/register" mb="20px" textAlign="center">Register</Link>
                <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/faqs" mb="20px" textAlign="center">FAQs</Link>
                <Link href="/ecell-website" mb="20px" textAlign="center">E-cell Website</Link>
                <Link href="/npci-website" mb="20px" textAlign="center">NPCI Website</Link>
                <PrimaryButton
                  onClick={() => { }}
                  h={"40px"}
                  w={"104px"}
                  fontSize='1rem'
                  fontWeight='600'
                  text='Sign in'
                  fontWeightH='600'
                />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Navbar;
