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
        <div className='FaqBackground'>
            <div className="ecellLogo" onClick={ () => window.location.href = '/'}></div>
            <Flex height="100vh">
                <Navbar onMenuClick={handleMenuClick} isHome={false}/>
                <Box minHeight="100vh" flex="1" className="faqContainer">
                    <FaqSection />
                </Box>
            </Flex>
        </div>
    );
};

export default FAQsPage;