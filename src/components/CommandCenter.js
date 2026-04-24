import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ExecutionZone from './ExecutionZone';
import RightPanel from './RightPanel';
import SessionList from './SessionList';
import {
  getTodaysTotalMinutes,
  filterSessionsToday,
} from '../utils/dateHelpers';

/**
 * CommandCenter Component
 * Main dashboard orchestrator for Page 1
 * Manages tasks, selected task state, and layout
 * 
 * @param {string} subject - Current task input from App
 * @param {Function} onSubjectChange - Callback to update subject in App
 * @param {number} timeLeft - Timer seconds remaining
 * @param {boolean} isRunning - Timer running state
 * @param {Function} onStart - Start timer callback
 * @param {Function} onPause - Pause timer callback
 * @param {Function} onReset - Reset timer callback
 * @param {number} sessionDuration - Current session duration in minutes
 * @param {Function} onDurationChange - Callback to update duration
 * @param {Array} sessions - All completed sessions
 * @param {number} dailyGoal - Daily study goal in minutes
 */
function CommandCenter({
  subject,
  onSubjectChange,
  timeLeft,
  isRunning,
  onStart,
  onPause,
  onReset,
  sessionDuration,
  onDurationChange,
  sessions,
  dailyGoal,
}) {
  // Local state for tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('study-task-list');
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with sample tasks if none exist
    return [
      {
        id: 1,
        text: 'React hooks review',
        priority: 1,
        dueDate: new Date().toISOString().split('T')[0],
      },
      {
        id: 2,
        text: 'Fix timer component',
        priority: 2,
        dueDate: new Date().toISOString().split('T')[0],
      },
      {
        id: 3,
        text: 'CSS Grid practice',
        priority: 1,
        dueDate: new Date().toISOString().split('T')[0],
      },
    ];
  });

  // Track which task was selected for auto-fill
  const [selectedTask, setSelectedTask] = useState(null);

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem('study-task-list', JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handle selecting a task
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  // Calculate today's total study minutes
  const completedMinutes = getTodaysTotalMinutes(sessions);

  // Filter sessions to only today's
  const todaysSessions = filterSessionsToday(sessions);

  return (
    <div className="command-center">
      {/* Progress Bar - Top */}
      <ProgressBar completedMinutes={completedMinutes} dailyGoal={dailyGoal} />

      {/* Main Grid - Left (Execution Zone) + Right (Focus & Add Task) */}
      <div className="command-center-grid">
        {/* Left Column: Execution Zone */}
        <ExecutionZone
          subject={subject}
          onSubjectChange={onSubjectChange}
          timeLeft={timeLeft}
          isRunning={isRunning}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
          sessionDuration={sessionDuration}
          onDurationChange={onDurationChange}
          selectedTask={selectedTask}
        />

        {/* Right Column: Focus Panel + Add Task */}
        <RightPanel
          tasks={tasks}
          onTaskSelect={handleTaskSelect}
          onAddTask={handleAddTask}
        />
      </div>

      {/* Bottom: Today's Sessions Log */}
      <SessionList sessions={todaysSessions} />
    </div>
  );
}

export default CommandCenter;
