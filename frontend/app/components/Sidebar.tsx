import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box, Flex, Image, Text, VStack, Spacer, IconButton, useDisclosure, Drawer, DrawerBody,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useMediaQuery
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 992px)");
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const SidebarContent = () => (
    <Flex flexDirection="column" h="full">
      <Flex align="center" mb={6} justifyContent="center">
        <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1717566910/ecell_npci.png" alt="E-Cell IIT Hyderabad" h="40px" />
      </Flex>

      <VStack align="start" spacing={4} w="240px" flex="1">
        <Link href="/dashboard/portal" passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
            bg={activePath === '/dashboard/portal' ? '#3A3154' : 'transparent'}>
            <Image src='/icons/home.svg' />
            <Text ml={4}>Portal</Text>
          </Box>
        </Link>

        <Link href="/dashboard/myteam" passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
            bg={activePath === '/dashboard/myteam' ? '#3A3154' : 'transparent'}>
            <Image src='/icons/team.svg' />
            <Text ml={4}>My team</Text>
          </Box>
        </Link>

        <Link href="/dashboard/leaderboard" passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
            bg={activePath === '/dashboard/leaderboard' ? '#3A3154' : 'transparent'}>
            <Image src='/icons/leaderboard.svg' />
            <Text ml={4}>Leaderboard</Text>
          </Box>
        </Link>

        <Link href="https://discord.gg/WfMhAuWx" target='_blank' passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px">
            <Image src='/icons/discord.svg' />
            <Text ml={4}>Discord</Text>
          </Box>
        </Link>

        <Link href="/signout" passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px">
            <Image src='/icons/signout.svg' />
            <Text ml={4}>Sign out</Text>
          </Box>
        </Link>
      </VStack>

      <Spacer />

      <Link href="/" passHref>
        <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md">
          <Image src='/icons/left-arrow.svg' />
          <Text ml={4}>Back to home page</Text>
        </Box>
      </Link>
    </Flex>
  );

  return (
    <Box display="flex">
      {isLargerThan768 ? (
        <Box
          bg="#1D1E37"
          w="300px"
          h="100vh"
          color="white"
          p={4}
          display="flex"
          flexDirection="column"
          position="fixed"
          zIndex="1000"
        >
          <SidebarContent />
        </Box>
      ) : (
        <>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            bg="transparent"
            color="white"
            _hover={{ bg: 'transparent' }}
            ml={2}
            mt={2}
            position="fixed"
            zIndex="overlay"
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent bg="#1D1E37" color="white">
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>
                <DrawerBody>
                  <SidebarContent />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
