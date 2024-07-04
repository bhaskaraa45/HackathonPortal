import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box, Flex, Image, Text, VStack, Spacer, IconButton, useDisclosure, Drawer, DrawerBody,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useMediaQuery,
  Divider,
} from '@chakra-ui/react';
import SignOutModal from './signOutModal';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 992px)");
  const [activePath, setActivePath] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const confirmSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  const SidebarContent = () => (
    <Flex flexDirection="column" h="full">
      <Flex align="center" mb="24px" justifyContent="center">
        <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1717566910/ecell_npci.png" alt="E-Cell IIT Hyderabad" h="40px" />
      </Flex>

      <Divider borderColor="white" />

      <VStack mt="24px" align="start" spacing={4} w="240px" flex="1">
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

        <Link href="https://discord.com/invite/v967F6a8cz" target='_blank' passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px">
            <Image src='/icons/discord.svg' />
            <Text ml={4}>Discord</Text>
          </Box>
        </Link>

        <Link href="" onClick={() => { setModalVisible(true) }}>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px">
            <Image src='/icons/signout.svg' />
            <Text ml={4}>Sign out</Text>
          </Box>
        </Link>
      </VStack>

      <Spacer />

      {isLargerThan768 &&
        <Link href="/" passHref>
          <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md">
            <Image src='/icons/left-arrow.svg' />
            <Text ml={4}>Back to home page</Text>
          </Box>
        </Link>
      }
    </Flex>
  );

  return (
    <>
      <SignOutModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmSignOut}
        title='Are you sure you want to sign out?'
      />
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
            <Flex
              position="fixed"
              width="100%"
              justifyContent="space-between"
              zIndex="overlay"
            >
              <IconButton
                ml="18px"
                mt="18px"
                aria-label="Open menu"
                icon={<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="42" height="42" rx="8" fill="#1D1E37" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11 13.25C11 12.5596 11.5596 12 12.25 12H29.75C30.4404 12 31 12.5596 31 13.25C31 13.9404 30.4404 14.5 29.75 14.5H12.25C11.5596 14.5 11 13.9404 11 13.25ZM11 20.75C11 20.0596 11.5596 19.5 12.25 19.5H29.75C30.4404 19.5 31 20.0596 31 20.75C31 21.4404 30.4404 22 29.75 22H12.25C11.5596 22 11 21.4404 11 20.75ZM12.25 27C11.5596 27 11 27.5596 11 28.25C11 28.9404 11.5596 29.5 12.25 29.5H29.75C30.4404 29.5 31 28.9404 31 28.25C31 27.5596 30.4404 27 29.75 27H12.25Z" fill="#F3F3F3" />
                </svg>}
                onClick={onOpen}
                bg="transparent"
                color="white"
                _hover={{ bg: 'transparent' }}
              />

              <IconButton
                mr="18px"
                mt="18px"
                aria-label="Back to home"
                icon={<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="42" height="42" rx="8" fill="#1D1E37" />
                  <path d="M21.2614 13.7486C21.1916 13.6818 21.0988 13.6445 21.0022 13.6445C20.9056 13.6445 20.8128 13.6818 20.743 13.7486L12.1133 21.9925C12.0766 22.0275 12.0475 22.0696 12.0276 22.1163C12.0077 22.1629 11.9974 22.2131 11.9975 22.2639L11.9961 30.0011C11.9961 30.3989 12.1541 30.7804 12.4354 31.0617C12.7167 31.343 13.0983 31.5011 13.4961 31.5011H18.0008C18.1997 31.5011 18.3905 31.422 18.5311 31.2814C18.6718 31.1407 18.7508 30.95 18.7508 30.7511V24.376C18.7508 24.2766 18.7903 24.1812 18.8606 24.1109C18.9309 24.0406 19.0263 24.001 19.1258 24.001H22.8758C22.9752 24.001 23.0706 24.0406 23.1409 24.1109C23.2113 24.1812 23.2508 24.2766 23.2508 24.376V30.7511C23.2508 30.95 23.3298 31.1407 23.4705 31.2814C23.6111 31.422 23.8019 31.5011 24.0008 31.5011H28.5036C28.9014 31.5011 29.2829 31.343 29.5643 31.0617C29.8456 30.7804 30.0036 30.3989 30.0036 30.0011V22.2639C30.0037 22.2131 29.9934 22.1629 29.9735 22.1163C29.9536 22.0696 29.9245 22.0275 29.8878 21.9925L21.2614 13.7486Z" fill="#F3F3F3" />
                  <path d="M32.0114 20.4445L28.5052 17.0902V12C28.5052 11.8011 28.4262 11.6103 28.2855 11.4697C28.1448 11.329 27.9541 11.25 27.7552 11.25H25.5052C25.3063 11.25 25.1155 11.329 24.9748 11.4697C24.8342 11.6103 24.7552 11.8011 24.7552 12V13.5L22.0402 10.9041C21.7861 10.6472 21.4083 10.5 21 10.5C20.5931 10.5 20.2163 10.6472 19.9622 10.9045L9.99189 20.4436C9.70033 20.7248 9.66377 21.1875 9.92908 21.4922C9.9957 21.5691 10.0773 21.6316 10.1688 21.676C10.2604 21.7204 10.36 21.7457 10.4617 21.7503C10.5633 21.755 10.6649 21.7389 10.7601 21.7031C10.8553 21.6672 10.9423 21.6124 11.0156 21.5419L20.7422 12.2475C20.812 12.1807 20.9048 12.1435 21.0014 12.1435C21.098 12.1435 21.1909 12.1807 21.2606 12.2475L30.9881 21.5419C31.1314 21.6793 31.3234 21.7543 31.5219 21.7504C31.7204 21.7465 31.9092 21.6641 32.047 21.5212C32.3349 21.2231 32.311 20.7309 32.0114 20.4445Z" fill="#F3F3F3" />
                </svg>}
                onClick={() => { router.push('/') }}
                bg="transparent"
                color="white"
                _hover={{ bg: 'transparent' }}
              />
            </Flex>

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
    </>
  );
};

export default Sidebar;
