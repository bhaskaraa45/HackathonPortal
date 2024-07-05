import React, { useEffect, useState } from 'react';
import { Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Image, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import PrimaryButton from './buttons';
import Session from 'supertokens-auth-react/recipe/session';
import SignOutModal from './signOutModal';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';
import router from 'next/router';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionButtton, setSessionButton] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const checkSession = async () => {
    if (await Session.doesSessionExist()) {
      setSessionButton('Sign Out')
      setIsLoading(false);
    } else {
      setSessionButton('Sign In')
      setIsLoading(false);
    }
  }

  const sessionButttonClicked = async () => {
    if (await Session.doesSessionExist()) {
      setModalVisible(true)
    } else {
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    checkSession();
  }, [])

  const confirmSignOut = async () => {
    await signOut();
    router.reload();
  };

  return (
    <>
      <SignOutModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmSignOut}
        title='Are you sure you want to sign out?'
      />
      <Box position="fixed" top="0" left="0" right="0" zIndex="1000" bg="#08091C" h={{ base: "64px", lg: "94px" }} color="#F3F3F3">
        <Flex alignItems="center" justifyContent="space-between" h="100%" px={{ base: "20px", lg: "80px" }}>
          <Image _hover={{ cursor: "pointer" }} onClick={() => { router.push('/') }} src="logo.png" alt="Logo" h="42px" />

          <Flex display={{ base: "none", lg: "flex" }} alignItems="center" fontWeight="normal" color="white" fontSize="1rem" fontFamily="Montserrat, sans-serif">
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/" mx="20px" w="53px" textAlign="center">Home</Link>
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/dashboard" mx="20px" w="99px" textAlign="center">Dashboard</Link>
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/about-hackathon" mx="20px" w="158px" textAlign="center">About Hackathon</Link>
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/register" mx="20px" w="77px" textAlign="center">Register</Link>
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="/faqs" mx="20px" w="52px" textAlign="center">FAQs</Link>
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="https://ecell.iith.ac.in" target='_blank' mx="20px" w="130px" textAlign="center">E-Cell Website</Link>
            <Link _hover={{ fontWeight: "bold", textDecoration: "underline" }} href="https://www.npci.org.in/" target='_blank' mx="20px" w="122px" textAlign="center">NPCI Website</Link>
            <Box
              ml="20px"
            >
              <PrimaryButton
                isLoading={isLoading}
                onClick={sessionButttonClicked}
                h={"40px"}
                w={"104px"}
                fontSize='1rem'
                fontWeight='600'
                text={sessionButtton}
                fontWeightH='600'
              />
            </Box>
          </Flex>

          <IconButton
            display={{ base: "flex", lg: "none" }}
            aria-label="Open Menu"
            icon={<svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="42" height="42" rx="8" fill="#1D1E37" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 13.25C11 12.5596 11.5596 12 12.25 12H29.75C30.4404 12 31 12.5596 31 13.25C31 13.9404 30.4404 14.5 29.75 14.5H12.25C11.5596 14.5 11 13.9404 11 13.25ZM11 20.75C11 20.0596 11.5596 19.5 12.25 19.5H29.75C30.4404 19.5 31 20.0596 31 20.75C31 21.4404 30.4404 22 29.75 22H12.25C11.5596 22 11 21.4404 11 20.75ZM12.25 27C11.5596 27 11 27.5596 11 28.25C11 28.9404 11.5596 29.5 12.25 29.5H29.75C30.4404 29.5 31 28.9404 31 28.25C31 27.5596 30.4404 27 29.75 27H12.25Z" fill="#F3F3F3" />
            </svg>}
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
                  <Link href="https://ecell.iith.ac.in" target='_blank' mb="20px" textAlign="center">E-cell Website</Link>
                  <Link href="https://www.npci.org.in/" target='_blank' mb="20px" textAlign="center">NPCI Website</Link>
                  <PrimaryButton
                    isLoading={isLoading}
                    onClick={sessionButttonClicked}
                    h={"40px"}
                    w={"104px"}
                    fontSize='1rem'
                    fontWeight='600'
                    text={sessionButtton}
                    fontWeightH='600'
                  />
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
