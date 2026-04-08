/**
 * Controls Component
 * Renders Start, Pause, and Reset buttons with proper disabled states
 * 
 * @param {Function} onStart - Handler for start button
 * @param {Function} onPause - Handler for pause button
 * @param {Function} onReset - Handler for reset button
 * @param {boolean} isRunning - Whether timer is currently running
 * @param {boolean} isSubjectEmpty - Whether subject input is empty
 */
function Controls({ onStart, onPause, onReset, isRunning, isSubjectEmpty }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <button
        style={{
          color: '#4CAF50',
          opacity: isSubjectEmpty || isRunning ? 0.5 : 1, // Dim if conditions not met
        }}
        onClick={onStart}
        disabled={isRunning || isSubjectEmpty}
      >
        Start
      </button>

      <button
        style={{
          marginLeft: '10px',
          color: '#FF0000',
        }}
        onClick={onPause}
        disabled={!isRunning}
      >
        Pause
      </button>

      <button
        style={{
          marginLeft: '10px',
        }}
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default Controls;
