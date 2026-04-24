/**
 * Date Helper Utilities for StudyTrack
 * Handles filtering sessions and tasks by date
 */

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Filter sessions to only include today's completed sessions
 * @param {Array} sessions - All sessions array
 * @returns {Array} Sessions from today only
 */
export const filterSessionsToday = (sessions) => {
  if (!sessions || sessions.length === 0) return [];
  
  return sessions.filter((session) => {
    // Sessions have completedAt as time string (e.g., "3:45 PM")
    // We need to check if they were completed today
    // For now, we'll assume recent sessions are today
    // In future, store full timestamp in session object
    return true; // Placeholder: all sessions in storage are from "today"
  });
};

/**
 * Calculate total study minutes for today
 * @param {Array} sessions - Sessions array
 * @returns {number} Total minutes
 */
export const getTodaysTotalMinutes = (sessions) => {
  const todaysSessions = filterSessionsToday(sessions);
  return todaysSessions.reduce((total, session) => total + session.duration, 0);
};

/**
 * Get today's tasks from the task list
 * @param {Array} tasks - All tasks array
 * @returns {Array} Tasks for today, sorted by priority (1=High first)
 */
export const getTodaysTasks = (tasks) => {
  if (!tasks || tasks.length === 0) return [];
  
  const today = getTodayDateString();
  
  return tasks
    .filter((task) => task.dueDate === today)
    .sort((a, b) => a.priority - b.priority); // Lower priority number = higher urgency
};

/**
 * Get top N tasks for today
 * @param {Array} tasks - All tasks array
 * @param {number} limit - Max tasks to return (default: 3)
 * @returns {Array} Top N tasks, sorted by priority
 */
export const getTopTodaysTasks = (tasks, limit = 3) => {
  return getTodaysTasks(tasks).slice(0, limit);
};

/**
 * Format duration for display (e.g., 90 minutes → "1h 30m")
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};
