import { formatTime } from '../utils/formatTime';

/**
 * TimerDisplay Component
 * Displays the countdown timer in MM:SS format
 * 
 * @param {number} timeLeft - Seconds remaining
 * @param {boolean} isRunning - Whether timer is running
 */
function TimerDisplay({ timeLeft, isRunning }) {
  return (
    <div className={`timer-display ${isRunning ? 'timer-running' : ''}`}>
      {formatTime(timeLeft)}
    </div>
  );
}

export default TimerDisplay;
