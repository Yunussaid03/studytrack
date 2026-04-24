import TopFocusPanel from './TopFocusPanel';
import AddTaskPanel from './AddTaskPanel';

/**
 * RightPanel Component
 * Container for Top 3 Focus and Add Task sections
 * 
 * @param {Array} tasks - All tasks array
 * @param {Function} onTaskSelect - Callback when task is selected from TopFocusPanel
 * @param {Function} onAddTask - Callback when new task is added from AddTaskPanel
 */
function RightPanel({ tasks, onTaskSelect, onAddTask }) {
  return (
    <div className="right-panel">
      <TopFocusPanel tasks={tasks} onTaskSelect={onTaskSelect} />
      <AddTaskPanel onAddTask={onAddTask} />
    </div>
  );
}

export default RightPanel;
