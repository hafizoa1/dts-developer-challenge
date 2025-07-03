import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskRequest, TaskStatus, TaskStats } from '../types/Task';
import { taskApi } from '../services/api';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  stats: TaskStats;
  createTask: (task: CreateTaskRequest) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate stats from tasks
  const stats: TaskStats = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'TODO').length,
    inProgress: tasks.filter(task => task.status === 'IN_PROGRESS').length,
    completed: tasks.filter(task => task.status === 'COMPLETED').length,
  };

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new task
  const createTask = async (task: CreateTaskRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskApi.createTask(task);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update task status
  const updateTaskStatus = async (id: string, status: TaskStatus): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await taskApi.updateTaskStatus(id, status);
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh tasks
  const refreshTasks = fetchTasks;

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    stats,
    createTask,
    updateTaskStatus,
    deleteTask,
    refreshTasks,
  };
};