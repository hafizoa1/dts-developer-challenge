export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED'; //We want then to be bale to have custom statuses also 

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  message: string;
  timestamp: string;
  status: number;
}