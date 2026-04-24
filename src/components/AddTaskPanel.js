import { useState } from 'react';
import { getTodayDateString } from '../utils/dateHelpers';

/**
 * AddTaskPanel Component
 * Form to create new tasks for today
 * 
 * @param {Function} onAddTask - Callback when task is added (receives task object)
 */
function AddTaskPanel({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('1'); // Default: High

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate task text is not empty
    if (!taskText.trim()) {
      alert('Please enter a task name');
      return;
    }

    // Create new task object
    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      text: taskText.trim(),
      priority: parseInt(priority, 10),
      dueDate: getTodayDateString(),
    };

    // Call parent callback
    onAddTask(newTask);

    // Clear form
    setTaskText('');
    setPriority('1');
  };

  return (
    <form className="add-task-panel" onSubmit={handleSubmit}>
      <h4 className="add-task-title">Add Task for Today</h4>

      <div className="add-task-form-group">
        <input
          type="text"
          className="add-task-input"
          placeholder="What do you want to focus on?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </div>

      <div className="add-task-form-row">
        <div className="add-task-priority-group">
          <label className="add-task-label">Priority</label>
          <select
            className="add-task-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>

        <button type="submit" className="add-task-button">
          + Add
        </button>
      </div>
    </form>
  );
}

export default AddTaskPanel;
