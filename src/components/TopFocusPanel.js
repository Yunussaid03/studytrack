import TaskItem from './TaskItem';
import { getTopTodaysTasks } from '../utils/dateHelpers';

/**
 * TopFocusPanel Component
 * Displays the top 3 most urgent tasks for today
 * 
 * @param {Array} tasks - All tasks array
 * @param {Function} onTaskSelect - Callback when task is clicked (receives task)
 */
function TopFocusPanel({ tasks, onTaskSelect }) {
  // Get top 3 tasks, filtered and sorted by priority
  const topTasks = getTopTodaysTasks(tasks, 3);

  return (
    <div className="top-focus-panel">
      <div className="top-focus-header">
        <h3 className="top-focus-title">Top 3 Focus</h3>
        <span className="top-focus-count">{topTasks.length}</span>
      </div>

      {topTasks.length === 0 ? (
        <div className="top-focus-empty">
          <p className="top-focus-empty-text">
            No tasks for today. Add one to get started! 📝
          </p>
        </div>
      ) : (
        <div className="top-focus-list">
          {topTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onSelect={() => onTaskSelect(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TopFocusPanel;
