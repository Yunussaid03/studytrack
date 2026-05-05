/**
 * useStudyStore Hook
 * Main state management for tasks, sessions, and timer state
 * Uses localStorage for persistence
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Task, Session, StudyStore, DAILY_GOAL_MIN } from '../lib/types';
import { STORAGE_KEYS, DEFAULT_TASKS } from '../lib/constants';

export function useStudyStore() {
  // Persist entire store as single object for atomic updates
  const [store, setStore] = useLocalStorage<StudyStore>(
    STORAGE_KEYS.TASKS,
    {
      tasks: DEFAULT_TASKS,
      sessions: [],
      timerTask: '',
      dailyGoal: DAILY_GOAL_MIN,
    },
    {
      serializer: JSON.stringify,
      deserializer: JSON.parse,
    }
  );

  // =============== TASK OPERATIONS ===============

  const addTask = useCallback(
    (newTask: Task) => {
      setStore((prev) => ({
        ...prev,
        tasks: [newTask, ...prev.tasks],
      }));
    },
    [setStore]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setStore((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
      }));
    },
    [setStore]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setStore((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      }));
    },
    [setStore]
  );

  const toggleTaskComplete = useCallback(
    (id: string) => {
      setStore((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      }));
    },
    [setStore]
  );

  // =============== SESSION OPERATIONS ===============

  const logSession = useCallback(
    (session: Session) => {
      setStore((prev) => ({
        ...prev,
        sessions: [session, ...prev.sessions],
      }));
    },
    [setStore]
  );

  const deleteSession = useCallback(
    (id: string) => {
      setStore((prev) => ({
        ...prev,
        sessions: prev.sessions.filter((session) => session.id !== id),
      }));
    },
    [setStore]
  );

  // =============== TIMER TASK OPERATIONS ===============

  const setTimerTask = useCallback(
    (taskName: string) => {
      setStore((prev) => ({
        ...prev,
        timerTask: taskName,
      }));
    },
    [setStore]
  );

  // =============== DAILY GOAL OPERATIONS ===============

  const setDailyGoal = useCallback(
    (minutes: number) => {
      setStore((prev) => ({
        ...prev,
        dailyGoal: Math.max(15, minutes), // Minimum 15 min
      }));
    },
    [setStore]
  );

  // =============== GETTERS ===============

  const getTasks = useCallback(() => store.tasks, [store.tasks]);

  const getSessions = useCallback(() => store.sessions, [store.sessions]);

  const getTimerTask = useCallback(() => store.timerTask, [store.timerTask]);

  const getDailyGoal = useCallback(() => store.dailyGoal, [store.dailyGoal]);

  const getIncompleteTasksSorted = useCallback(() => {
    return store.tasks
      .filter((task) => !task.completed)
      .sort((a, b) => {
        // Sort by priority first (1 > 2 > 3), then by due date
        if (a.priority !== b.priority) return a.priority - b.priority;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [store.tasks]);

  return {
    // Raw store
    store,
    setStore,

    // Task operations
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    getTasks,
    getIncompleteTasksSorted,

    // Session operations
    logSession,
    deleteSession,
    getSessions,

    // Timer task
    setTimerTask,
    getTimerTask,

    // Daily goal
    setDailyGoal,
    getDailyGoal,
  };
}

export type UseStudyStore = ReturnType<typeof useStudyStore>;
