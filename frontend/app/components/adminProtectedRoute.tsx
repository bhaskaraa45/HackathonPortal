import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminLoadingPortal } from './loadingPortal';
// import { signOut } from 'supertokens-auth-react/recipe/thirdparty';
import { useAdminAuth } from '../hooks/useAdminAuth';
import NotRegisteredModal from './notRegistered';
import styles from '@/styles/home.module.css'
import Navbar from './Navbar';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';

const AdminProtectedRoute = (WrappedComponent: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        const { isSessionExists, isAuthenticated, loading } = useAdminAuth();
        const [isModalVisible, setModalVisible] = useState(false);
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isSessionExists) {
                router.push({
                    pathname: '/login',
                    query: { redirectTo: router.asPath }
                });
            }
        }, [loading, isSessionExists, router]);

        if (loading) {
            return <AdminLoadingPortal />;
        }
        const onClose = async () => {
            // await signOut();
            setModalVisible(false);
            router.replace("/")
        };
        return (
            <>
                {isAuthenticated ? (
                    <WrappedComponent {...props} />
                ) : isSessionExists ? (
                    <NotAdminModal isVisible={true} onClose={onClose} />
                ) : null}
            </>
        );
    };

    return Wrapper;
};

interface NotAdminModal {
    isVisible: boolean;
    onClose: () => void;
}

function NotAdminModal({ isVisible, onClose }: NotAdminModal) {
    if (!isVisible) {
        return null;
    }
    return (
        <div className={styles.home}>
            <Navbar />
            <NotRegisteredModal
                button='CLOSE'
                isOpen={true}
                onClose={onClose}
                // description='You are not an Admin. If you are, then please contact us at' 
                description={
                    <Text
                        color="white"
                        fontWeight="normal"
                        fontSize="1.25rem">
                        {"You are not an Admin. If you are, then please contact us at "}
                        <a style={{ color: '#007BFF', textDecoration: 'none' }}
                            href="mailto:ecell@iith.ac.in">ecell@iith.ac.in</a>
                    </Text>}
            />
        </div >

        // <div id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        //     <div className="relative p-4 w-full max-w-md max-h-full">
        //         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        //             <button
        //                 type="button"
        //                 className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        //                 onClick={onClose}
        //             >
        //                 <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        //                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        //                 </svg>
        //                 <span className="sr-only">Close modal</span>
        //             </button>
        //             <div className="p-4 md:p-5 text-center">
        //                 <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        //                 </svg>
        //                 <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You are not an Admin. If you are, then please contact us at <a
        //                     style={{ color: '#007BFF', textDecoration: 'none' }}
        //                     href="mailto:ecell@iith.ac.in">ecell@iith.ac.in</a></h3>
        //             </div>
        //         </div>
        //     </div >
        // </div >
    );
}

export default AdminProtectedRoute;
