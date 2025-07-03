import React from 'react';
import { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import LoadingSpinner from '../common/LoadingSpinner';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onUpdateStatus: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onUpdateStatus,
  onDeleteTask,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 mb-6">
          Get started by creating your first task.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;