import ProtectedRoute from '@/app/components/protectedRoutes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomHead from '@/app/components/customHead';
import Session from 'supertokens-auth-react/recipe/session';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const status = await Session.doesSessionExist()
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
            <CustomHead title='Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
        </>
    );
};

export default ProtectedRoute(Dashboard);
