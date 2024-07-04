import React, { ReactNode } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { Box, Flex } from '@chakra-ui/react';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <Flex>
            <Sidebar />
            <Box minHeight="100vh" flex="1" ml={{ base: 0, lg: "300px" }} p={1}>
                {children}
            </Box>
        </Flex>
    );
};

export default DashboardLayout;
