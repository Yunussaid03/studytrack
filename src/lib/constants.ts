/**
 * StudyTrack Constants & Config
 */

export const TIMER_PRESETS = [15, 25, 45, 50, 60] as const;

export const DEFAULT_TASKS = [
  {
    id: '1',
    text: 'React hooks review',
    subject: 'React',
    priority: 1 as const,
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    text: 'Fix timer component',
    subject: 'Frontend',
    priority: 2 as const,
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    text: 'CSS Grid practice',
    subject: 'CSS',
    priority: 1 as const,
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export const STORAGE_KEYS = {
  TASKS: 'study-tasks',
  SESSIONS: 'study-sessions',
  TIMER_TASK: 'study-timer-task',
  DAILY_GOAL: 'study-daily-goal',
  DARK_MODE: 'study-dark-mode',
} as const;

export const BURNOUT_THRESHOLDS = {
  HIGH: 7, // Tasks > 7 in a day = high load
  WARNING: 5,
  OPTIMAL: 5,
} as const;
