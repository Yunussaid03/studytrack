/**
 * StudyTrack Type Definitions
 * Single source of truth for data structures
 */

export const DAILY_GOAL_MIN = 120; // 2 hours default

export interface Task {
  id: string;
  text: string;
  subject: string;
  priority: 1 | 2 | 3; // 1=high, 2=medium, 3=low
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  createdAt: string; // ISO timestamp
}

export interface Session {
  id: string;
  taskId?: string; // Link back to task if exists
  subject: string; // What was studied
  duration: number; // Minutes
  completedAt: string; // ISO timestamp (when timer hit 0:00)
  startedAt: string; // ISO timestamp (when Start was clicked)
}

export interface StudyStore {
  tasks: Task[];
  sessions: Session[];
  timerTask: string; // Current task in timer input
  dailyGoal: number; // Minutes
}

export type TimerDuration = 15 | 25 | 45 | 50 | 60; // Preset pomodoro lengths
