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
    <div
      style={{
        marginTop: '50px',
        width: '500px',
        textAlign: 'left',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          marginBottom: '20px',
          color: '#333',
        }}
      >
        Study Sessions
      </h2>

      {sessions.length === 0 ? (
        <p style={{ color: '#999', fontStyle: 'italic' }}>
          No sessions yet. Complete a study session to see it here!
        </p>
      ) : (
        <div>
          {sessions.map((session) => (
            <SessionItem key={session.id} session={session} />
          ))}
        </div>
      )}

      {/* Show total study time */}
      {sessions.length > 0 && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#E3F2FD',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, color: '#1976D2', fontSize: '16px' }}>
            <strong>Total Study Time:</strong> {totalMinutes} minutes
          </p>
        </div>
      )}
    </div>
  );
}

export default SessionList;
