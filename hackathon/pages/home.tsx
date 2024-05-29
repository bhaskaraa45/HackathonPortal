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
    };

    return (
        <div className={styles.container}>
            <div className={styles.ellipse1}></div>
            <div className={styles.rectangle1}></div>
            <div className={styles.starttext}>
                <b>Buckle up!</b> <br />
                Hackathon will start in
            </div>
            <div className={styles.countdownBOX}>
                {countdown}
            </div>
            <div className={styles.description}>
                Hack your <b>future,</b><br />
                <b>Prizes, Jobs & Glory</b> <br />
                awaits you....
            </div>
            <div className={styles.register} >
                <div className={styles.registerText} onClick={handleRegisterClick}>
                    Register now!
                </div>
            </div>
            <div className={styles.ecellLogo}></div>
        </div>
    );
}
