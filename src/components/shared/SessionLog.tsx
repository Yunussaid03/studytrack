/**
 * SessionLog Component
 * Shows today's completed study sessions
 */

import { Session } from '../../lib/types';
import { filterSessionsToday, formatTimeOfDay } from '../../lib/utils';
import '../../styles/session-log.css';

interface SessionLogProps {
  sessions: Session[];
}

export default function SessionLog({ sessions }: SessionLogProps) {
  const todaySessions = filterSessionsToday(sessions);

  return (
    <div className="session-log-container">
      <h3>📝 Today's Sessions</h3>

      {todaySessions.length === 0 ? (
        <p className="empty-state">
          No sessions yet. Start your first study session! 🚀
        </p>
      ) : (
        <div className="sessions-list">
          {todaySessions.map((session) => (
            <div key={session.id} className="session-item">
              <div className="session-left">
                <span className="session-check">✓</span>
                <div className="session-info">
                  <p className="session-subject">{session.subject}</p>
                  <p className="session-time">{formatTimeOfDay(session.completedAt)}</p>
                </div>
              </div>
              <span className="session-duration">{session.duration} min</span>
            </div>
          ))}

          {todaySessions.length > 0 && (
            <div className="session-summary">
              ✨ You've completed {todaySessions.length} session
              {todaySessions.length > 1 ? 's' : ''} today!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
