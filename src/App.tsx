/**
 * App Component
 * Main entry point with React Router setup
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CommandCenter from './pages/CommandCenter';
import Syllabus from './pages/Syllabus';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<CommandCenter />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
