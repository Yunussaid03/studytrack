import { useState } from 'react';
import './App.css';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import SessionList from './components/SessionList';

function App() {
  // App-level state
  const [subject, setSubject] = useState('');
  const [sessions, setSessions] = useState([]);

  // Timer logic is now in a custom hook
  const { timeLeft, isRunning, start, pause, reset } = useTimer(
    10 * 60,
    () => {
      // Callback when timer completes
      if (subject.trim()) {
        saveSession();
      }
    }
  );

  // Save the completed session
  const saveSession = () => {
    const newSession = {
      id: Date.now(), // Unique ID based on timestamp
      subject: subject,
      duration: 10, // 10 minutes
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
    start();
  };

  return (
    <div className="App">
      {/* Header */}
      <div
        style={{
          fontSize: '50px',
          fontWeight: 'bold',
          color: '#0000FF',
        }}
      >
        <h1>Study Tracker</h1>
      </div>
      <p>Your study session tracker</p>

      {/* Subject Input */}
      <div style={{ marginTop: '30px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="What are you studying?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isRunning}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            borderRadius: '5px',
            border: '2px solid #ddd',
          }}
        />
      </div>

      {/* Timer Display */}
      <TimerDisplay timeLeft={timeLeft} isRunning={isRunning} />
      <p>Time remaining</p>

      {/* Controls */}
      <Controls
        onStart={handleStart}
        onPause={pause}
        onReset={reset}
        isRunning={isRunning}
        isSubjectEmpty={!subject.trim()}
      />

      {/* Status */}
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Status: {isRunning ? '▶️ Running' : '⏸️ Paused'}
      </p>

      {/* Sessions List */}
      <SessionList sessions={sessions} />
    </div>
  );
}

export default App;
