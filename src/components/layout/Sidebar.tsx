/**
 * Sidebar Component
 * Persistent navigation sidebar
 */

import { Link, useLocation } from 'react-router-dom';
import '../../styles/sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="sidebar">
      {/* Logo/Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">📚</div>
        <div className="sidebar-title">StudyTrack</div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <Link
          to="/"
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          title="Dashboard"
        >
          <span className="nav-icon">⏱️</span>
          <span className="nav-label">Dashboard</span>
        </Link>

        <Link
          to="/syllabus"
          className={`nav-link ${isActive('/syllabus') ? 'active' : ''}`}
          title="Tasks"
        >
          <span className="nav-icon">📝</span>
          <span className="nav-label">Tasks</span>
        </Link>

        <Link
          to="/analytics"
          className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
          title="Analytics"
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Analytics</span>
        </Link>
      </nav>

      {/* Status Pill */}
      <div className="sidebar-footer">
        <div className="status-pill">
          <span className="status-dot"></span>
          <span>Local-only</span>
        </div>
      </div>
    </aside>
  );
}
