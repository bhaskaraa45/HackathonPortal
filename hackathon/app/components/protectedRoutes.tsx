import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import LoadingPortal from './loadingPortal';

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <LoadingPortal />;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectedRoute;
