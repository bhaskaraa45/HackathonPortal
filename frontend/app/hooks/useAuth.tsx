import { useEffect, useState } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import axios from 'axios';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSessionExists, setIsSessionExists] = useState(false);
    const [loading, setLoading] = useState(true);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        async function checkAuth() {
            try {
                const sessionExists = await Session.doesSessionExist();
                setIsSessionExists(sessionExists);
                if (sessionExists) {
                    const response = await axios.get(`${backendUrl}/exists`);
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return { isSessionExists, isAuthenticated, loading };
};
