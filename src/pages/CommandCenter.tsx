/**
 * CommandCenter Page
 * Main dashboard - Timer, Progress, Top Focus, Today's Sessions
 */

import { useEffect } from 'react';
import { useStudyStore } from '../hooks/useStudyStore';
import { useTimer } from '../hooks/useTimer';
import ProgressBar from '../components/shared/ProgressBar';
import TimerDisplay from '../components/shared/TimerDisplay';
import TopFocus from '../components/shared/TopFocus';
import SessionLog from '../components/shared/SessionLog';
import '../styles/command-center.css';

export default function CommandCenter() {
  const {
    getTasks,
    getSessions,
    getTimerTask,
    setTimerTask,
    getDailyGoal,
    logSession,
    getIncompleteTasksSorted,
  } = useStudyStore();

  const { timeLeft, isRunning, start, pause, reset } = useTimer(25 * 60); // Default 25 min

  const tasks = getTasks();
  const sessions = getSessions();
  const dailyGoal = getDailyGoal();
  const timerTask = getTimerTask();
  const incompleteTasks = getIncompleteTasksSorted();

  // Auto-log session when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && isRunning === false && timerTask.trim()) {
      const now = new Date().toISOString();
      logSession({
        id: Date.now().toString(),
        subject: timerTask,
        duration: 25, // TODO: make dynamic based on session duration
        completedAt: now,
        startedAt: now,
      });
      setTimerTask('');
    }
  }, [timeLeft, isRunning, timerTask, logSession, setTimerTask]);

  return (
    <div className="command-center">
      {/* Progress Bar */}
      <ProgressBar dailyGoal={dailyGoal} sessions={sessions} />

      <div className="command-center-grid">
        {/* Main: Timer */}
        <TimerDisplay
          timeLeft={timeLeft}
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
          timerTask={timerTask}
          onTaskChange={setTimerTask}
        />

        {/* Right: Top Focus */}
        <TopFocus tasks={incompleteTasks} onTaskSelect={setTimerTask} />
      </div>

      {/* Sessions Log */}
      <SessionLog sessions={sessions} />
    </div>
  );
}
