import SessionItem from './SessionItem';

/**
 * SessionList Component
 * Renders all completed sessions and total study time
 * 
 * @param {Array} sessions - Array of session objects
 */
function SessionList({ sessions }) {
  const totalMinutes = sessions.reduce(
    (total, session) => total + session.duration,
    0
  );

  return (
    <section className="sessions-card">
      <h2 className="session-heading">Study Sessions</h2>

      {sessions.length === 0 ? (
        <p className="session-empty">
          No sessions yet. Complete a study session to see it here!
        </p>
      ) : (
        <div>
          {sessions.map((session) => (
            <SessionItem key={session.id} session={session} />
          ))}
        </div>
      )}

      {sessions.length > 0 && (
        <div className="session-summary">
          Total Study Time: {totalMinutes} minutes
        </div>
      )}
    </section>
  );
}

export default SessionList;
