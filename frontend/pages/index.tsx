import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import Navbar from '@/app/components/Navbar';
import Session from 'supertokens-auth-react/recipe/session';
import { getSessionUser } from '@/app/api/auth';
import router from 'next/router';

export default function Home() {
    const [countdown, setCountdown] = useState('00:00:00:00');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2024-08-15T00:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setCountdown('00:00:00:00');
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdown(`${days < 10 ? '0' + days : days}:${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const checkSession = async () => {
        if (await Session.doesSessionExist()) {
            const user = await getSessionUser();
            if (user.isRegisterd) {
                user.isAdmin ? router.replace('/admin') : router.replace('/dashboard')
                return;
            }
        } else {
            router.replace('/login');
        }
    };

    const handleRegisterClick = () => {
         checkSession();
    };

    const handleMenuClick = (newMenuState: boolean) => {
        setMenuOpen(newMenuState);
    };


    return (
        <>
            <div className={styles.container}>
                <div className='ecellLogo'></div>
                <div className={`${styles.circleContainer} ${menuOpen ? styles.circleContainerAFTERCLICK : ''}`}>
                    <div className={`${styles.ellipse1} ${menuOpen ? styles.ellipse1AFTERCLICK : ''}`}></div>
                    <div className={`${styles.register} ${menuOpen ? styles.registerAFTERCLICK : ''}`}>
                        <div className={styles.registerText} onClick={handleRegisterClick}>
                            Register now!
                        </div>
                    </div>
                </div>

                <Navbar onMenuClick={handleMenuClick} isHome={true} />

                <div className={`${styles.starttext} ${menuOpen ? styles.starttextAFTERCLICK : ''}`}>
                    <b>Buckle up!</b> <br />
                    Hackathon will start in
                </div>
                <div className={`${styles.countdownBOX} ${menuOpen ? styles.countdownBOXAFTERCLICK : ''}`}>
                    {countdown}
                </div>

                <div className={`${styles.description} ${menuOpen ? styles.descriptionAFTERCLICK : ''}`}>
                    Hack your <b>future,</b><br />
                    <b>Prizes, Jobs & Glory</b> <br />
                    awaits you....
                </div>

            </div >
        </>

    );
}
