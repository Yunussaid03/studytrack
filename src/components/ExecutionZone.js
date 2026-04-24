import { useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import Controls from './Controls';
import DailyGoalSelector from './DailyGoalSelector';

/**
 * ExecutionZone Component
 * Left column of Command Center: Contains timer, subject input, duration selector, and controls
 * 
 * @param {string} subject - Current task name
 * @param {Function} onSubjectChange - Callback when subject changes
 * @param {number} timeLeft - Seconds remaining in timer
 * @param {boolean} isRunning - Whether timer is active
 * @param {Function} onStart - Start button handler
 * @param {Function} onPause - Pause button handler
 * @param {Function} onReset - Reset button handler
 * @param {number} sessionDuration - Current session duration in minutes
 * @param {Function} onDurationChange - Callback when duration changes
 * @param {Object} selectedTask - Task selected from right panel (triggers auto-fill)
 */
function ExecutionZone({
  subject,
  onSubjectChange,
  timeLeft,
  isRunning,
  onStart,
  onPause,
  onReset,
  sessionDuration,
  onDurationChange,
  selectedTask,
}) {
  // Auto-fill subject when a task is selected from the right panel
  useEffect(() => {
    if (selectedTask && selectedTask.text) {
      onSubjectChange(selectedTask.text);
    }
  }, [selectedTask, onSubjectChange]);

  return (
    <div className="execution-zone">
      {/* Subject Input */}
      <div className="field-group">
        <label className="field-label">What are you studying?</label>
        <input
          type="text"
          className="field-input"
          placeholder="e.g., React hooks, Python basics..."
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
        />
      </div>

      {/* Timer Display */}
      <div className="timer-card">
        <TimerDisplay timeLeft={timeLeft} isRunning={isRunning} />
        <p className="timer-label">
          {isRunning ? 'Keep going! 💪' : 'Ready to study?'}
        </p>
      </div>

      {/* Duration Selector */}
      <DailyGoalSelector
        currentDuration={sessionDuration}
        onDurationChange={onDurationChange}
      />

      {/* Control Buttons */}
      <Controls
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
        isRunning={isRunning}
        isSubjectEmpty={!subject.trim()}
      />
    </div>
  );
}

export default ExecutionZone;
