/**
 * StudyTrack Utility Functions
 * Pure functions for date math, formatting, and calculations
 */

import { Session } from './types';

/**
 * Check if a date string is today
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Get start of week (Monday) for a given date
 */
export function startOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

/**
 * Filter sessions to only today's
 */
export function filterSessionsToday(sessions: Session[]): Session[] {
  return sessions.filter((session) => isToday(session.completedAt));
}

/**
 * Filter sessions to this week
 */
export function filterSessionsThisWeek(sessions: Session[]): Session[] {
  const weekStart = startOfWeek();
  return sessions.filter((session) => {
    const sessionDate = new Date(session.completedAt);
    return sessionDate >= weekStart;
  });
}

/**
 * Calculate total minutes studied today
 */
export function getTodaysTotalMinutes(sessions: Session[]): number {
  return filterSessionsToday(sessions).reduce((sum, session) => sum + session.duration, 0);
}

/**
 * Calculate total minutes studied this week
 */
export function getWeeksTotalMinutes(sessions: Session[]): number {
  return filterSessionsThisWeek(sessions).reduce((sum, session) => sum + session.duration, 0);
}

/**
 * Format seconds to MM:SS
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format date as readable string (e.g., "Apr 29")
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options = { month: 'short' as const, day: 'numeric' as const };
  return d.toLocaleDateString('en-US', options);
}

/**
 * Format time as HH:MM AM/PM
 */
export function formatTimeOfDay(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Count days until date
 */
export function daysUntil(dateString: string): number {
  const target = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Determine if date is overdue
 */
export function isOverdue(dateString: string): boolean {
  return daysUntil(dateString) < 0;
}

/**
 * Determine if date is soon (within 3 days)
 */
export function isSoon(dateString: string): boolean {
  const days = daysUntil(dateString);
  return days >= 0 && days <= 3;
}

/**
 * Group sessions by subject
 */
export function groupSessionsBySubject(sessions: Session[]): Record<string, number> {
  return sessions.reduce(
    (acc, session) => {
      acc[session.subject] = (acc[session.subject] || 0) + session.duration;
      return acc;
    },
    {} as Record<string, number>
  );
}

/**
 * Count tasks completed today
 */
export function countTasksCompletedToday(sessions: Session[]): number {
  const todaySessions = filterSessionsToday(sessions);
  // Use Set to avoid counting same task multiple times
  const uniqueTaskIds = new Set(todaySessions.map((s) => s.taskId).filter(Boolean));
  return uniqueTaskIds.size;
}
