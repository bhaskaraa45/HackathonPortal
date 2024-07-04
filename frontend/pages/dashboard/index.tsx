import ProtectedRoute from '@/app/components/protectedRoutes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomHead from '@/app/components/customHead';
import Session from 'supertokens-auth-react/recipe/session';
import axios from 'axios';
import { Flex, Spinner } from '@chakra-ui/react';
import Navbar from '@/app/components/Navbar';
import styles from '@/styles/home.module.css';
import CustomModal from '@/app/components/customModal';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Dashboard = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [cantAccess, setCantAccess] = useState(true);

    const fetchDate = async () => {
        try {
            const response = await axios.get(`${backendUrl}/date`);
            const targetDate = new Date(response.data).getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setCantAccess(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDate();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const status = await Session.doesSessionExist();
            if (status) {
                if (!loading) {
                    if (!cantAccess) {
                        router.replace('/dashboard/portal');
                    }
                }
            } else {
                router.push('/login');
            }
        };
        checkAuth();
    }, [loading, cantAccess, router]);

    if (loading) {
        return (
            <Flex direction="column" align="center" justify="center" height="100vh" textAlign="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (cantAccess) {
        return (
            <div className={styles.home}>
                <Navbar />
                <CustomModal title='Cannot Access!' isOpen={true} onClose={() => router.replace('/')} description='Cannot access the dashboard right now, wait till the hackathon starts.' />
            </div>
        );
    }

    return (
        <>
            <CustomHead title='Hackathon Dashboard | E-Cell IIT Hyderabad - NPCI' description='Welcome to the Dashboard of E-Cell IIT Hyderabad & NPCI collaborative Hackathon.' />
        </>
    );
};

export default ProtectedRoute(Dashboard);
