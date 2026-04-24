import { useState, useEffect, useRef } from 'react';
import './App.css';
import { useTimer } from './hooks/useTimer';
import CommandCenter from './components/CommandCenter';

function App() {
  // App-level state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('study-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [subject, setSubject] = useState('');
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('study-sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [sessionDuration, setSessionDuration] = useState(() => {
    const saved = localStorage.getItem('study-duration');
    return saved ? Number(saved) : 10;
  });
  // eslint-disable-next-line no-unused-vars
  const [dailyGoal, setDailyGoal] = useState(() => {
    const saved = localStorage.getItem('study-daily-goal');
    return saved ? Number(saved) : 120; // Default: 2 hours
  });
  // Note: setDailyGoal is reserved for future use (will add UI to change daily goal)
  const sessionSavedRef = useRef(false);


  useEffect(() => {
    localStorage.setItem('study-sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('study-duration', sessionDuration);
  }, [sessionDuration]);

  useEffect(() => {
    localStorage.setItem('study-daily-goal', dailyGoal);
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('study-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Timer logic is now in a custom hook
  const { timeLeft, isRunning, start, pause, reset } = useTimer(
    sessionDuration * 60
  );

  useEffect(() => {
    if (timeLeft !== 0 || isRunning || !subject.trim() || sessionSavedRef.current) {
      return;
    }

    saveSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isRunning, subject]);

  // Save the completed session
  const saveSession = () => {
    if (sessionSavedRef.current || !subject.trim()) {
      return;
    }

    sessionSavedRef.current = true;

    const newSession = {
      id: Date.now(), // Unique ID based on timestamp
      subject: subject,
      duration: sessionDuration,
      completedAt: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    // Add new session to the front of the array
    setSessions((prevSessions) => [newSession, ...prevSessions]);

    // Clear input for next session
    setSubject('');
  };

  // Handlers for button clicks
  const handleStart = () => {
    if (!subject.trim()) {
      alert("Please enter what you're studying!");
      return;
    }

    sessionSavedRef.current = false;
    start();
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="App-inner">
        <header className="App-header">
          <h1 className="App-title">Study Tracker</h1>
          <p className="App-subtitle">A clean study timer with subject-based session tracking, saved sessions, and totals.</p>
        </header>

        <button
          className="button button-reset theme-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <CommandCenter
          subject={subject}
          onSubjectChange={setSubject}
          timeLeft={timeLeft}
          isRunning={isRunning}
          onStart={handleStart}
          onPause={pause}
          onReset={reset}
          sessionDuration={sessionDuration}
          onDurationChange={setSessionDuration}
          sessions={sessions}
          dailyGoal={dailyGoal}
        />
      </div>
    </div>
  );
}

export default App;
