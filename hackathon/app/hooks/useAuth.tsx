import { useEffect, useState } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/supertoken';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const sessionExists = await Session.doesSessionExist();
            setIsAuthenticated(sessionExists);
            setLoading(false);
        }

        checkAuth();
    }, []);

    return { isAuthenticated, loading };
};
