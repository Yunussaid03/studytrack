import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to manage timer state and logic
 * @param {number} initialSeconds - Initial time in seconds (default: 10 minutes)
 * @param {Function} onComplete - Callback when timer reaches 0
 * @returns {Object} Timer state and control functions
 */
export const useTimer = (initialSeconds = 10 * 60, onComplete = () => {}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const hasCompletedRef = useRef(false); // Track if completion handler was called

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;

        // Fire completion handler only once when timer reaches 0
        if (newTime <= 0 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          clearInterval(timer);
          setIsRunning(false);
          
          // Play completion sound
          const audio = new Audio(
            'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
          );
          audio.play();

          // Call the completion callback
          onComplete();
        }

        return newTime <= 0 ? 0 : newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onComplete]);

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
