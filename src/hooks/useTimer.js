import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to manage timer state and logic
 * @param {number} initialSeconds - Initial time in seconds (default: 10 minutes)
 * @returns {Object} Timer state and control functions
 */
export const useTimer = (initialSeconds = 10 * 60) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const hasCompletedRef = useRef(false); // Track if completion handler was called

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft !== 0 || !isRunning || hasCompletedRef.current) {
      return;
    }

    hasCompletedRef.current = true;
    setIsRunning(false);

    const audio = new Audio(
      'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
    );
    audio.play();
  }, [timeLeft, isRunning]);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    hasCompletedRef.current = false;
  }, [initialSeconds]);

  const start = () => {
    if (timeLeft > 0 && !isRunning) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
    hasCompletedRef.current = false; // Reset the completion flag
  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
  };
};
