/**
 * ProgressBar Component
 * Shows daily study goal progress with gradient fill
 */

import { getTodaysTotalMinutes } from '../../lib/utils';
import { Session, DAILY_GOAL_MIN } from '../../lib/types';
import '../../styles/progress-bar.css';

interface ProgressBarProps {
  dailyGoal: number;
  sessions: Session[];
}

export default function ProgressBar({ dailyGoal = DAILY_GOAL_MIN, sessions }: ProgressBarProps) {
  const completedMinutes = getTodaysTotalMinutes(sessions);
  const percentage = Math.min(Math.round((completedMinutes / dailyGoal) * 100), 100);
  const isGoalReached = percentage >= 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <h2>📊 Daily Progress</h2>
        <span className={`progress-percentage ${isGoalReached ? 'goal-reached' : ''}`}>
          {percentage}%
        </span>
      </div>

      <div className="progress-stats">
        <span className="progress-minutes">
          {completedMinutes} min / {dailyGoal} min
        </span>
        <span className="progress-status">
          {isGoalReached ? '✅ Goal Reached!' : `${dailyGoal - completedMinutes} min left`}
        </span>
      </div>

      <div className={`progress-track ${isGoalReached ? 'goal-reached' : ''}`}>
        <div
          className="progress-fill"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
