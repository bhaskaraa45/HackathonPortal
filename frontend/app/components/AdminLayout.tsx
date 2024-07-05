import React, { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import AdminSideBar from './adminSidebar';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <Flex>
            <AdminSideBar />
            <Box minHeight="100vh" flex="1" ml={{ base: 0, lg: "300px" }} p={1}>
                {children}
            </Box>
        </Flex>
    );
};

export default AdminLayout;
