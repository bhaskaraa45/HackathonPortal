import ProtectedRoute from '@/app/components/protectedRoutes';
import { getSessionStatus } from '@/app/config/supertoken';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const status = await getSessionStatus()
            if (status) {
                router.replace('/dashboard/portal');
            } else {
                router.push('/login');
            }
        }
        checkAuth();
    }, [router]);
    return (
        <>
            <Head>
                <title>
                    Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI
                </title>
                <meta name="description" content="Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon." />
            </Head>
        </>
    );
};

export default ProtectedRoute(Dashboard);
