import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';

export default function Home() {
    const [countdown, setCountdown] = useState('00:00:00:00');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2024-06-01T00:00:00').getTime();

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

    const handleRegisterClick = () => {
        alert("Register button clicked!");
        // You can add your registration logic here
    };

    const handleHamburgerClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={styles.container}>
            <div className={styles.ecellLogo}></div>

            <div className={`${styles.circleContainer} ${menuOpen ? styles.circleContainerAFTERCLICK : ''}`}>
                <div className={`${styles.ellipse1} ${menuOpen ? styles.ellipse1AFTERCLICK : ''}`}></div>
                <div className={`${styles.register} ${menuOpen ? styles.registerAFTERCLICK : ''}`}>
                    <div className={styles.registerText} onClick={handleRegisterClick}>
                        Register now!
                    </div>
                </div>
            </div>

            <div className={`${styles.rectangle1} ${menuOpen ? styles.rectangle1AFTERCLICK : ''}`}>
                <div className={styles.menuButton} onClick={handleHamburgerClick}>
                    <svg fill="#ffffff" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g data-name="Layer 2">
                                <g data-name="menu">
                                    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect>
                                    <rect x="3" y="11" width="18" height="2" rx=".95" ry=".95"></rect>
                                    <rect x="3" y="16" width="18" height="2" rx=".95" ry=".95"></rect>
                                    <rect x="3" y="6" width="18" height="2" rx=".95" ry=".95"></rect>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>

                <div className={`${styles.menuOptions} ${menuOpen ? styles.menuOptionsVisible : styles.menuOptionsHidden}`}>
                    <ol>
                        <li>Sign in</li>
                        <li>Discord</li>
                        <li>FAQs</li>
                        <li>Admin</li>
                    </ol>
                </div>

            </div>
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

        </div>
    );
}
