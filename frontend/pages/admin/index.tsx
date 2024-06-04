import Sidebar from '@/app/components/Sidebar';
import React, { useEffect } from 'react';
import Table from '@/app/components/Table';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProtectedRoute from '@/app/components/protectedRoutes';
import CustomHead from '@/app/components/customHead';
import AdminSideBar from '@/app/components/adminSidebar';
import { useRouter } from 'next/router';
import Session from 'supertokens-auth-react/recipe/session';
import AdminProtectedRoute from '@/app/components/adminProtectedRoute';


const AdminPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const status = await Session.doesSessionExist()
            if (status) {
                router.replace('/admin/responses');
            } else {
                router.push('/login');
            }
        }
        checkAuth();
    }, [router]);


    return (
        <div className="dashboardBG">
            <CustomHead title='Hackathon Admin | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
            <Flex height="100vh">
                <AdminSideBar isLoading={false} />
            </Flex>
        </div>
    );
};

export default (AdminPage);
// export default AdminProtectedRoute(AdminPage);
