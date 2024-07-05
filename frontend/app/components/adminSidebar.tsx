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

const AdminSideBar = () => {
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
                <Image src="https://res.cloudinary.com/dqyxqfvnv/image/upload/v1720208328/joint-icon_lsgi3s" alt="E-Cell IIT Hyderabad" h="40px" />
            </Flex>

            <Divider borderColor="white" />

            <VStack mt="24px" align="start" spacing={4} w="240px" flex="1">
                <Link href="/admin/responses" passHref>
                    <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
                        bg={activePath === '/admin/responses' ? '#3A3154' : 'transparent'}>
                        <Box maxW="24px">
                            <svg
                                className="w-6 h-7 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                fill="currentColor" height="200px" width="200px" version="1.1" id="Artwork" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path
                                            d="M345.8,93.6H223.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h122.1c6.8,0,12.3-5.5,12.3-12.3 C358,99.1,352.5,93.6,345.8,93.6z">
                                        </path>
                                        <circle cx="123.9" cy="105.9" r="13.8"></circle>
                                        <path
                                            d="M358,226.8c0-6.8-5.5-12.3-12.3-12.3H223.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h122.1 C352.5,239.1,358,233.6,358,226.8z">
                                        </path>
                                        <circle cx="123.9" cy="226.8" r="13.8"></circle>
                                        <path
                                            d="M84,420.5h197.1c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H84c-26.5,0-48-21.5-48-48v-0.5c0-26.5,21.5-48,48-48h219.2 c6.8,0,12.3-5.5,12.3-12.3c0-6.8-5.5-12.3-12.3-12.3H84c-26.5,0-48-21.5-48-48v-0.5c0-26.5,21.5-48,48-48h287.7 c26.5,0,48,21.5,48,48v0.5c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-0.5c0-24.5-12.2-46.1-30.9-59.3 c18.6-12.2,30.9-33.3,30.9-57.1v-8.6c0-37.7-30.7-68.4-68.4-68.4H80c-37.7,0-68.4,30.7-68.4,68.4v8.6c0,23.9,12.3,44.9,30.9,57.1 c-18.6,13.1-30.9,34.8-30.9,59.3v0.5c0,25.1,12.8,47.2,32.2,60.2c-19.4,13-32.2,35.1-32.2,60.2v0.5C11.6,388,44.1,420.5,84,420.5z M80,154.1c-24.2,0-43.9-19.7-43.9-43.9v-8.6c0-24.2,19.7-43.9,43.9-43.9h295.9c24.2,0,43.9,19.7,43.9,43.9v8.6 c0,24.2-19.7,43.9-43.9,43.9h-4.1H84H80z">
                                        </path>
                                        <path
                                            d="M223.6,335.5c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h55.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H223.6z">
                                        </path>
                                        <circle cx="123.9" cy="347.8" r="13.8"></circle>
                                        <path
                                            d="M500.4,454.8v-78.4c0-13.3-10.8-24.1-24.1-24.1h-1.7v-28.7c0-35.9-29.2-65.2-65.2-65.2c-28.7,0-53.7,18.4-62.3,45.8 c-2,6.5,1.6,13.3,8.1,15.3c6.5,2,13.3-1.6,15.3-8.1c5.3-17.1,20.9-28.6,38.9-28.6c22.4,0,40.7,18.3,40.7,40.7v28.7H342.6 c-13.3,0-24.1,10.8-24.1,24.1v78.4c0,13.3,10.8,24.1,24.1,24.1h133.8C489.6,478.9,500.4,468.1,500.4,454.8z M475.9,454.4H343.1 v-77.5h132.9V454.4z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </Box>
                        <Text ml={4}>Responses</Text>
                    </Box>
                </Link>

                <Link href="/admin/teams" passHref>
                    <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
                        bg={activePath === '/admin/teams' ? '#3A3154' : 'transparent'}>
                        <Box maxW="24px">
                            <svg
                                className="w-6 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                viewBox="0 0 20 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.07 6.41005C11.6774 5.56132 12.0041 4.54377 12.0041 3.50005C12.0041 2.45634 11.6774 1.43879 11.07 0.590053C11.6385 0.202008 12.3117 -0.00378014 13 5.2579e-05C13.9283 5.2579e-05 14.8185 0.368802 15.4749 1.02518C16.1313 1.68156 16.5 2.57179 16.5 3.50005C16.5 4.42831 16.1313 5.31855 15.4749 5.97493C14.8185 6.6313 13.9283 7.00005 13 7.00005C12.3117 7.00388 11.6385 6.7981 11.07 6.41005ZM3.5 3.50005C3.5 2.80782 3.70527 2.13113 4.08986 1.55556C4.47444 0.979985 5.02107 0.531381 5.66061 0.266474C6.30015 0.00156766 7.00388 -0.067744 7.68282 0.0673043C8.36175 0.202353 8.98539 0.535695 9.47487 1.02518C9.96436 1.51466 10.2977 2.1383 10.4327 2.81724C10.5678 3.49617 10.4985 4.1999 10.2336 4.83944C9.96867 5.47899 9.52007 6.02561 8.9445 6.4102C8.36892 6.79478 7.69223 7.00005 7 7.00005C6.07174 7.00005 5.1815 6.6313 4.52513 5.97493C3.86875 5.31855 3.5 4.42831 3.5 3.50005ZM5.5 3.50005C5.5 3.79672 5.58797 4.08673 5.7528 4.33341C5.91762 4.58008 6.15189 4.77234 6.42597 4.88587C6.70006 4.9994 7.00166 5.02911 7.29264 4.97123C7.58361 4.91335 7.85088 4.77049 8.06066 4.56071C8.27044 4.35093 8.4133 4.08366 8.47118 3.79269C8.52906 3.50172 8.49935 3.20012 8.38582 2.92603C8.27229 2.65194 8.08003 2.41767 7.83335 2.25285C7.58668 2.08803 7.29667 2.00005 7 2.00005C6.60218 2.00005 6.22064 2.15809 5.93934 2.43939C5.65804 2.7207 5.5 3.10223 5.5 3.50005ZM14 13.0001V15.0001H0V13.0001C0 13.0001 0 9.00005 7 9.00005C14 9.00005 14 13.0001 14 13.0001ZM12 13.0001C11.86 12.2201 10.67 11.0001 7 11.0001C3.33 11.0001 2.07 12.3101 2 13.0001M13.95 9.00005C14.5629 9.47678 15.064 10.0819 15.4182 10.7729C15.7723 11.4639 15.9709 12.2241 16 13.0001V15.0001H20V13.0001C20 13.0001 20 9.37005 13.94 9.00005H13.95Z"
                                />
                            </svg>
                        </Box>
                        <Text ml={4}>Teams</Text>
                    </Box>
                </Link>

                <Link href="/admin/leaderboard" passHref>
                    <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px"
                        bg={activePath === '/admin/leaderboard' ? '#3A3154' : 'transparent'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19H9M15 19V8.6C15 8.44087 14.9368 8.28826 14.8243 8.17574C14.7117 8.06321 14.5591 8 14.4 8H9.6C9.44087 8 9.28826 8.06321 9.17574 8.17574C9.06321 8.28826 9 8.44087 9 8.6V19M15 19H20.4C20.5591 19 20.7117 18.9368 20.8243 18.8243C20.9368 18.7117 21 18.5591 21 18.4V15.1C21 14.9409 20.9368 14.7883 20.8243 14.6757C20.7117 14.5632 20.5591 14.5 20.4 14.5H15.6C15.4409 14.5 15.2883 14.5632 15.1757 14.6757C15.0632 14.7883 15 14.9409 15 15.1V19ZM9 19V13.1C9 12.9409 8.93679 12.7883 8.82426 12.6757C8.71174 12.5632 8.55913 12.5 8.4 12.5H3.6C3.44087 12.5 3.28826 12.5632 3.17574 12.6757C3.06321 12.7883 3 12.9409 3 13.1V18.4C3 18.5591 3.06321 18.7117 3.17574 18.8243C3.28826 18.9368 3.44087 19 3.6 19H9ZM15 5H9" stroke="#F3F3F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Text ml={4}>Leaderboard</Text>
                    </Box>
                </Link>

                <Link href="https://discord.com/invite/v967F6a8cz" target='_blank' passHref>
                    <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.2701 5.33005C17.9401 4.71005 16.5001 4.26005 15.0001 4.00005C14.987 3.99963 14.9739 4.00209 14.9618 4.00728C14.9497 4.01246 14.9389 4.02023 14.9301 4.03005C14.7501 4.36005 14.5401 4.79005 14.4001 5.12005C12.8091 4.88005 11.1911 4.88005 9.60012 5.12005C9.46012 4.78005 9.25012 4.36005 9.06012 4.03005C9.05012 4.01005 9.02012 4.00005 8.99012 4.00005C7.49012 4.26005 6.06012 4.71005 4.72012 5.33005C4.71012 5.33005 4.70012 5.34005 4.69012 5.35005C1.97012 9.42005 1.22012 13.38 1.59012 17.3C1.59012 17.32 1.60012 17.34 1.62012 17.35C3.42012 18.67 5.15012 19.47 6.86012 20C6.89012 20.01 6.92012 20 6.93012 19.98C7.33012 19.43 7.69012 18.85 8.00012 18.24C8.02012 18.2 8.00012 18.16 7.96012 18.15C7.39012 17.93 6.85012 17.67 6.32012 17.37C6.28012 17.35 6.28012 17.29 6.31012 17.26C6.42012 17.18 6.53012 17.09 6.64012 17.01C6.66012 16.99 6.69012 16.99 6.71012 17C10.1501 18.57 13.8601 18.57 17.2601 17C17.2801 16.99 17.3101 16.99 17.3301 17.01C17.4401 17.1 17.5501 17.18 17.6601 17.27C17.7001 17.3 17.7001 17.36 17.6501 17.38C17.1301 17.69 16.5801 17.94 16.0101 18.16C15.9701 18.17 15.9601 18.22 15.9701 18.25C16.2901 18.86 16.6501 19.44 17.0401 19.99C17.0701 20 17.1001 20.01 17.1301 20C18.8501 19.47 20.5801 18.67 22.3801 17.35C22.4001 17.34 22.4101 17.32 22.4101 17.3C22.8501 12.77 21.6801 8.84005 19.3101 5.35005C19.3001 5.34005 19.2901 5.33005 19.2701 5.33005ZM8.52012 14.91C7.49012 14.91 6.63012 13.96 6.63012 12.79C6.63012 11.62 7.47012 10.67 8.52012 10.67C9.58012 10.67 10.4201 11.63 10.4101 12.79C10.4101 13.96 9.57012 14.91 8.52012 14.91ZM15.4901 14.91C14.4601 14.91 13.6001 13.96 13.6001 12.79C13.6001 11.62 14.4401 10.67 15.4901 10.67C16.5501 10.67 17.3901 11.63 17.3801 12.79C17.3801 13.96 16.5501 14.91 15.4901 14.91Z" fill="#F3F3F3" />
                        </svg>
                        <Text ml={4}>Discord</Text>
                    </Box>
                </Link>

                <Link href="" onClick={() => { setModalVisible(true) }}>
                    <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md" w="240px">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#F3F3F3" />
                        </svg>
                        <Text ml={4}>Sign out</Text>
                    </Box>
                </Link>
            </VStack>

            <Spacer />

            {isLargerThan768 &&
                <Link href="/" passHref>
                    <Box as="a" display="flex" alignItems="center" _hover={{ textDecoration: 'none', bg: '#3A3154' }} p={2} borderRadius="md">
                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15L9.615 12.885L5.745 9H21V6H5.745L9.615 2.13L7.5 0L0 7.5" fill="#F3F3F3" />
                        </svg>
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

export default AdminSideBar;
