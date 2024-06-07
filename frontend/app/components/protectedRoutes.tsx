import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import LoadingPortal from './loadingPortal';
import NotRegisteredModal from './notRegistered';
import { signOut } from 'supertokens-auth-react/recipe/thirdparty';

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const { isSessionExists, isAuthenticated, loading } = useAuth();
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
      return <LoadingPortal />;
    }
    const onClose = async () => {
      // await signOut();
      setModalVisible(false);
      router.replace("/register")
    };
    return (
      <>
        {isAuthenticated ? (
          <WrappedComponent {...props} />
        ) : isSessionExists ? (
          <NotRegisteredModal isVisible={true} onClose={onClose} />
        ) : null}
      </>
    );
  };

  return Wrapper;
};

export default ProtectedRoute;
