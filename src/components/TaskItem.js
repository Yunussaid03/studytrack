/**
 * TaskItem Component
 * Displays a single task with priority badge and click handler
 * 
 * @param {Object} task - Task object with id, text, priority
 * @param {Function} onSelect - Callback when task is clicked
 */
function TaskItem({ task, onSelect }) {
  // Map priority number to display label and CSS class
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return 'Normal';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 1:
        return 'high';
      case 2:
        return 'medium';
      case 3:
        return 'low';
      default:
        return 'normal';
    }
  };

  const priorityLabel = getPriorityLabel(task.priority);
  const priorityClass = getPriorityClass(task.priority);

  return (
    <div
      className={`task-item task-priority-${priorityClass}`}
      onClick={() => onSelect(task)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(task);
        }
      }}
    >
      <div className="task-content">
        <p className="task-text">{task.text}</p>
      </div>
      <div className={`task-priority-badge priority-${priorityClass}`}>
        {priorityLabel}
      </div>
    </div>
  );
}

export default TaskItem;
