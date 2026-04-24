/**
 * SessionItem Component
 * Renders a single study session card
 * 
 * @param {Object} session - Session object with id, subject, duration, completedAt
 */
function SessionItem({ session }) {
  return (
    <article className="session-item">
      <div className="session-content">
        <p className="session-subject">{session.subject}</p>
        <p className="session-meta">
          {session.duration} minutes • {session.completedAt}
        </p>
      </div>
      <div className="session-status">✓ Done</div>
    </article>
  );
}

export default SessionItem;
