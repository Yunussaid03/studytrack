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
    <div
      style={{
        marginTop: '50px',
        fontSize: '48px',
        fontWeight: 'bold',
        color: isRunning ? '#4CAF50' : '#333', // Green when running
      }}
    >
      {formatTime(timeLeft)}
    </div>
  );
}

export default TimerDisplay;
