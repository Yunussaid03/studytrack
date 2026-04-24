/**
 * ProgressBar Component
 * Displays daily study progress with visual bar and percentage
 * 
 * @param {number} completedMinutes - Total minutes studied today
 * @param {number} dailyGoal - Daily goal in minutes
 */
function ProgressBar({ completedMinutes, dailyGoal }) {
  // Calculate percentage, capped at 100%
  const percentage = Math.min((completedMinutes / dailyGoal) * 100, 100);
  
  // Determine status label
  let status = 'Getting started';
  if (percentage >= 80) status = 'Almost there!';
  else if (percentage >= 40) status = 'On track';
  
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <h3 className="progress-bar-title">Today's Progress</h3>
        <span className="progress-bar-status">{status}</span>
      </div>
      
      <div className="progress-bar-stats">
        <span className="progress-bar-numbers">
          {completedMinutes} / {dailyGoal} minutes
        </span>
        <span className="progress-bar-percentage">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
          aria-valuenow={Math.round(percentage)}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
