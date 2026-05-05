/**
 * AppLayout Component
 * Persistent sidebar + main content outlet
 * Used by React Router
 */

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../styles/layout.css';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
