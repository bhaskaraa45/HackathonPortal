import ProtectedRoute from '@/app/components/protectedRoutes';
import { getSessionStatus } from '@/app/config/supertoken';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const status =await getSessionStatus()
            if (status) {
                router.push('/dashboard/portal');
            } else {
                router.push('/login');
            }
        }
        checkAuth();
    }, [router]);

    return null;
};

export default ProtectedRoute(Dashboard);
