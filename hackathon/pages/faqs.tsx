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
            <div className="ecellLogo"></div>
            <Flex height="100vh">
                <Navbar onMenuClick={handleMenuClick} />
                <Box minHeight="100vh" flex="1" className="contentContainer">
                    <FaqSection />
                </Box>
            </Flex>
        </div>
    );
};

export default FAQsPage;