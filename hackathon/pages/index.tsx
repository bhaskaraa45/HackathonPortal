import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';

export default function Home() {
    const [countdown, setCountdown] = useState('00:00:00:00');

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
        alert("Menu button clicked!");
        // You can add your registration logic here
    };

    return (
        <div className={styles.container}>
            <div className={styles.countdownBOX}>
                {countdown}
            </div>
            <div className={styles.ellipse1}></div>
            <div className={styles.rectangle1}>
                <div className={styles.menuButton} onClick={handleHamburgerClick}>
                    <svg fill="#ffffff" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="menu"> <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect> <rect x="3" y="11" width="18" height="2" rx=".95" ry=".95"></rect> <rect x="3" y="16" width="18" height="2" rx=".95" ry=".95"></rect> <rect x="3" y="6" width="18" height="2" rx=".95" ry=".95"></rect> </g> </g> </g></svg>
                </div>
            </div>
            <div className={styles.starttext}>
                <b>Buckle up!</b> <br />
                Hackathon will start in
            </div>
            
            <div className={styles.description}>
                Hack your <b>future,</b><br />
                <b>Prizes, Jobs & Glory</b> <br />
                awaits you....
            </div>
            <div className={styles.register}>
                <div className={styles.registerText} onClick={handleRegisterClick}>
                    Register now!
                </div>
            </div>
            <div className={styles.ecellLogo}></div>
        </div>
    );
}
