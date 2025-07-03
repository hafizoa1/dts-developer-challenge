import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Task } from '../../types/Task';
import StatusBadge from '../common/StatusBadge';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onDeleteTask: (id: string) => Promise<void>;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onDeleteTask,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDelete = async () => {
    if (!task) return;

    setLoading(true);
    setError('');

    try {
      await onDeleteTask(task.id);
      handleClose();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setLoading(false);
    onClose();
  };

  if (!task) return null;

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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="⚠️ Delete Task">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        {/* Warning Message */}
        <div className="text-center">
          <div className="text-6xl mb-4">🗑️</div>
          <p className="text-lg text-gray-900 mb-2">
            Are you sure you want to delete this task?
          </p>
          <p className="text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Task Details */}
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-400">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Task Title</h4>
              <p className="text-gray-700">{task.title}</p>
            </div>

            {task.description && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Description</h4>
                <p className="text-gray-700 text-sm">{task.description}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                <StatusBadge status={task.status} />
              </div>
              
              <div className="text-right">
                <h4 className="font-medium text-gray-900 mb-1">Created</h4>
                <p className="text-sm text-gray-500">{formatDate(task.createdAt)}</p>
              </div>
            </div>

            {task.dueDate && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Due Date</h4>
                <p className="text-sm text-gray-500">{formatDate(task.dueDate)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Warning */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-red-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 mb-1">
                Warning: Permanent Deletion
              </h3>
              <p className="text-sm text-red-700">
                Once deleted, this task and all its information will be permanently removed 
                from the system and cannot be recovered.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Delete Task'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;