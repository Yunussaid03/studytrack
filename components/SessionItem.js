/**
 * SessionItem Component
 * Renders a single study session card
 * 
 * @param {Object} session - Session object with id, subject, duration, completedAt
 */
function SessionItem({ session }) {
  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <strong style={{ fontSize: '18px', color: '#333' }}>
            {session.subject}
          </strong>
          <p
            style={{
              margin: '5px 0 0 0',
              color: '#666',
              fontSize: '14px',
            }}
          >
            {session.duration} minutes • {session.completedAt}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          ✓ Done
        </div>
      </div>
    </div>
  );
}

export default SessionItem;
