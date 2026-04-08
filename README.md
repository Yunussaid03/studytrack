# StudyTrack

A productivity-focused study session tracker built with React. Track your study sessions, monitor time spent on subjects, and build productive study habits.

## ✨ Features

- ⏱️ **Countdown Timer** — 10-minute focused study sessions with visual feedback
- 📝 **Session Tracking** — Log what you studied and when
- 🔔 **Audio Notification** — Plays a sound when a session completes
- 📊 **Total Study Time** — Aggregates time across all sessions
- 💾 **Session History** — View all past study sessions
- 🎯 **Clean UI** — Simple, distraction-free interface

## 🛠️ Tech Stack

- **React** (v18+) — UI framework with Hooks
- **JavaScript (ES6+)** — Clean, modern JavaScript
- **CSS** — Styled with inline styles for simplicity
- **HTML5** — Web Audio API for notifications

## 📁 Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── TimerDisplay.js      # Shows MM:SS countdown
│   ├── Controls.js          # Start/Pause/Reset buttons
│   ├── SessionList.js       # List of study sessions + total time
│   └── SessionItem.js       # Single session card
├── hooks/                   # Custom React hooks
│   └── useTimer.js         # Timer logic (countdown, state, handlers)
├── utils/                   # Utility functions
│   └── formatTime.js       # Converts seconds to MM:SS format
├── App.js                   # Main component (orchestrates everything)
├── App.css                  # Global styles
└── index.js                 # React entry point
```

### 🧩 Component Architecture

```
App (main state)
├── TimerDisplay (displays timeLeft)
├── Controls (buttons with handlers)
├── SessionList
│   └── SessionItem (maps over sessions array)
```

**Key Design Decisions:**
- **useTimer hook** encapsulates all timer logic → reusable, testable
- **Presentational components** (TimerDisplay, SessionItem) take data as props
- **Container component** (App) manages state and passes to children
- **formatTime utility** is decoupled from React → pure function

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd StudyTrack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## 📖 How to Use

1. **Enter a subject** — Type what you're studying (e.g., "React Hooks")
2. **Click Start** — Begin your 10-minute focused session
3. **Work focused** — The timer counts down, you can't change the subject while running
4. **Pause if needed** — Click Pause to temporarily stop (button is only enabled while running)
5. **Session completes** — Audio notification plays, session is logged
6. **View history** — All sessions appear in the "Study Sessions" section with timestamps
7. **Track progress** — See your total study time at the bottom

## 🔧 Development

### Available Scripts

- `npm start` — Run the development server
- `npm test` — Run the test suite (if configured)
- `npm run build` — Build for production

### Code Quality

- Clean, readable component names
- JSDoc comments on key functions
- Prop drilling minimized through composition
- No inline clutter — styles in components, not JSX

### Bug Fixes & Improvements

**v1.0 Improvements:**
- ✅ Fixed duplicate session bug (used `useRef` in custom hook)
- ✅ Ensured session saves only once when timer reaches 0
- ✅ Proper cleanup of intervals in useEffect
- ✅ Separated concerns into reusable components

## 📋 Future Improvements

### Short Term
- **Local Storage** — Persist sessions across page refreshes
- **Customizable Duration** — Let users choose session length (5, 10, 25, 45 min)
- **Delete Sessions** — Remove sessions from history
- **Edit Subject** — Update subject for completed sessions

### Medium Term
- **Analytics Dashboard** — Charts showing study trends over time
- **Break Timer** — Add Pomodoro-style break sessions
- **Daily Goals** — Set and track daily study time targets
- **Dark Mode** — Toggle between light and dark themes

### Long Term
- **User Accounts** — Sign up and cloud sync sessions
- **Mobile App** — React Native version for iOS/Android
- **Notifications** — Desktop/push notifications at session end
- **Leaderboard** — Community challenges and stats

## 🪲 Known Issues

- None currently tracked. Found a bug? Create an issue!

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This project is a personal study tool. Feel free to fork it and customize it for your own learning!

---

**Made with ❤️ for productive studying**
