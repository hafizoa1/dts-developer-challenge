import axios, { AxiosResponse } from 'axios';
import { Task, CreateTaskRequest, TaskStatus } from '../types/Task';

// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Functions
export const taskApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response: AxiosResponse<Task[]> = await apiClient.get('/tasks');
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task> => {
    const response: AxiosResponse<Task> = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (task: CreateTaskRequest): Promise<Task> => {
    const response: AxiosResponse<Task> = await apiClient.post('/tasks', task);
    return response.data;
  },

  // Update task status
  updateTaskStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    const response: AxiosResponse<Task> = await apiClient.patch(
      `/tasks/${id}/status`,
      null,
      { params: { status } }
    );
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};

export default taskApi;