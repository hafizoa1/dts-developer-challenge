import React from 'react';
import { Task } from '../../types/Task';
import StatusBadge from '../common/StatusBadge';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateStatus,
  onDeleteTask,
}) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  const isOverdue = (dueDateString?: string): boolean => {
    if (!dueDateString) return false;
    try {
      const dueDate = new Date(dueDateString);
      const now = new Date();
      return dueDate < now && task.status !== 'COMPLETED';
    } catch {
      return false;
    }
  };

  return (
    <li className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <StatusBadge status={task.status} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-900 truncate">
                {task.title}
              </p>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                {task.dueDate && (
                  <div className="flex items-center space-x-1">
                    <span>📅</span>
                    <span className={isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''}>
                      Due: {formatDate(task.dueDate)}
                      {isOverdue(task.dueDate) && (
                        <span className="ml-1 text-red-600">⚠️ Overdue</span>
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span>⏰</span>
                  <span>Created: {formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onUpdateStatus(task)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Update Status"
          >
            <span className="mr-1">🔄</span>
            Status
          </button>
          
          <button
            onClick={() => onDeleteTask(task)}
            className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            title="Delete Task"
          >
            <span className="mr-1">🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;