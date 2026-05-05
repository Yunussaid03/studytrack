/**
 * TimerDisplay Component
 * Pomodoro timer with task input and controls
 */

import { formatTime } from '../../lib/utils';
import '../../styles/timer-display.css';

interface TimerDisplayProps {
  timeLeft: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  timerTask: string;
  onTaskChange: (task: string) => void;
}

export default function TimerDisplay({
  timeLeft,
  isRunning,
  onStart,
  onPause,
  onReset,
  timerTask,
  onTaskChange,
}: TimerDisplayProps) {
  const handleStart = () => {
    if (timerTask.trim()) {
      onStart();
    } else {
      alert('Please enter what you\'re studying!');
    }
  };

  return (
    <div className="timer-display-container">
      <div className="timer-header">
        <h2>⏱️ Session Timer</h2>
        {isRunning && <span className="status-badge running">Running...</span>}
      </div>

      <div className={`timer-card ${isRunning ? 'active' : ''}`}>
        <p className={`timer-display ${isRunning ? 'running' : ''}`}>
          {formatTime(timeLeft)}
        </p>
      </div>

      <input
        type="text"
        className="timer-task-input"
        placeholder="What are you studying?"
        value={timerTask}
        onChange={(e) => onTaskChange(e.target.value)}
        disabled={isRunning}
      />

      <div className="timer-controls">
        <button
          className="btn btn-primary"
          onClick={handleStart}
          disabled={isRunning || !timerTask.trim()}
        >
          ▶ Start
        </button>
        <button
          className="btn btn-warning"
          onClick={onPause}
          disabled={!isRunning}
        >
          ⏸ Pause
        </button>
        <button
          className="btn btn-secondary"
          onClick={onReset}
        >
          ↻ Reset
        </button>
      </div>
    </div>
  );
}
