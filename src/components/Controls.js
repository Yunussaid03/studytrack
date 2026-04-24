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
    <div className="controls">
      <button
        className="button button-start"
        onClick={onStart}
        disabled={isRunning || isSubjectEmpty}
      >
        Start
      </button>

      <button
        className="button button-pause"
        onClick={onPause}
        disabled={!isRunning}
      >
        Pause
      </button>

      <button className="button button-reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default Controls;
