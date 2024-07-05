import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from '@/app/components/Navbar';
import FaqSection from '@/app/components/FAQ';

const FAQsPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuClick = (newMenuState: boolean) => {
        setMenuOpen(newMenuState);
    };
    return (
        <div>
            <Navbar />
            <Box mt={{ base: "64px", lg: "94px" }}>
                <Flex minHeight="100vh">
                    <Box flex="1" >
                        <FaqSection />
                    </Box>
                </Flex>
            </Box>
        </div>
    );
};

export default FAQsPage;
