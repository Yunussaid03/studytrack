/**
 * TopFocus Component
 * Shows 3 most urgent incomplete tasks
 */

import { Task } from '../../lib/types';
import { daysUntil, isOverdue, isSoon } from '../../lib/utils';
import '../../styles/top-focus.css';

interface TopFocusProps {
  tasks: Task[];
  onTaskSelect: (taskName: string) => void;
}

export default function TopFocus({ tasks, onTaskSelect }: TopFocusProps) {
  // Get top 3 tasks
  const topTasks = tasks.slice(0, 3);

  const getDeadlineStatus = (dueDate: string) => {
    if (isOverdue(dueDate)) return 'overdue';
    if (isSoon(dueDate)) return 'soon';
    return 'normal';
  };

  const getDaysText = (dueDate: string) => {
    const days = daysUntil(dueDate);
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days}d left`;
  };

  return (
    <div className="top-focus-container">
      <h3>🎯 Top Focus</h3>

      {topTasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Great work!</p>
      ) : (
        <div className="focus-list">
          {topTasks.map((task, index) => (
            <div
              key={task.id}
              className={`focus-item priority-${task.priority} ${getDeadlineStatus(task.dueDate)}`}
              onClick={() => onTaskSelect(task.text)}
            >
              <div className="focus-number">{index + 1}</div>
              <div className="focus-content">
                <p className="focus-text">{task.text}</p>
                <span className={`focus-deadline ${getDeadlineStatus(task.dueDate)}`}>
                  {getDaysText(task.dueDate)}
                </span>
              </div>
              <span className="focus-priority">P{task.priority}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
