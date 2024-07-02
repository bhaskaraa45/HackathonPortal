import Navbar from "@/app/components/Navbar";
import RegistrationForm from "@/app/components/registerComponent";
import { Box, ChakraProvider, Flex, Heading, extendTheme } from "@chakra-ui/react";
import React, { useState } from "react";

const Register: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuClick = (newMenuState: boolean) => {
        setMenuOpen(newMenuState);
    };

    const customTheme = extendTheme({
        config: {
          initialColorMode: 'dark',
          useSystemColorMode: false,
        },
        styles: {
          global: {
            'html, body': {
              backgroundColor: '#06081A',
            },
          },
        },
        fonts: {
          heading: `'Montserrat', sans-serif`,
          body: `'Montserrat', sans-serif`,
        },
      });

    return (
        <ChakraProvider theme={customTheme}>
            <div className='FaqBackground'>
                {/* <div className="ecellLogo" onClick={() => window.location.href = '/'}></div> */}
                <Flex height="100vh">
                    {/* <Navbar onMenuClick={handleMenuClick} isHome={false} /> */}
                    <Box minHeight="100vh" flex="1" className="">
                        <Heading fontSize='currentSize' fontWeight="500" className="registration_heading">Register your team</Heading>
                        <RegistrationForm />
                    </Box>
                </Flex>
            </div>
        </ChakraProvider>
    );
}

export default Register