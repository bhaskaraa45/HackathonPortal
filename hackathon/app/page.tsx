'use client'

import React, { useEffect, useState } from 'react';

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

  return (
    <div className="container">
      <div className="header">
        <h1>Buckle up!</h1>
        <p>Hackathon will start in</p>
        <div className="countdown">{countdown}</div>
      </div>
      <div className="register">
        <button>Register now!</button>
      </div>
      <p className="footer">Hack your future, Prizes, Jobs & Glory awaits you....</p>
    </div>
  );
}
