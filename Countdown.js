import React, { useState, useRef } from 'react';

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

const INITIAL_TIME = 60;

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startCountdown = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 1) return prev - 1;
        clearInterval(intervalRef.current);
        setIsRunning(false);
        return 0;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Reset timer when stopped at 0
  React.useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <div className="countdown">{formatTime(timeLeft)}</div>
      <div className="button-group">
        <button onClick={startCountdown} disabled={isRunning || timeLeft === 0}>
          Start
        </button>
        <button onClick={stopCountdown} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default Countdown;
