import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Task, TaskStatus } from '../../types/Task';
import StatusBadge from '../common/StatusBadge';

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateStatus: (id: string, status: TaskStatus) => Promise<void>;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  onClose,
  task,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('TODO');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Update selected status when task changes
  useEffect(() => {
    if (task) {
      setSelectedStatus(task.status);
    }
  }, [task]);

  const statusOptions: { value: TaskStatus; label: string; description: string }[] = [
    {
      value: 'TODO',
      label: 'To Do',
      description: 'Task is pending and not yet started',
    },
    {
      value: 'IN_PROGRESS',
      label: 'In Progress',
      description: 'Task is currently being worked on',
    },
    {
      value: 'COMPLETED',
      label: 'Completed',
      description: 'Task has been finished successfully',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task) return;

    if (selectedStatus === task.status) {
      onClose();
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onUpdateStatus(task.id, selectedStatus);
      handleClose();
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Failed to update task status. Please try again.');
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🔄 Update Status">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        {/* Task Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Task</h4>
          <p className="text-gray-700 mb-3">{task.title}</p>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Current Status:</span>
            <StatusBadge status={task.status} />
          </div>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select New Status:
          </label>
          <div className="space-y-3">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`relative flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedStatus === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => setSelectedStatus(e.target.value as TaskStatus)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {option.label}
                    </span>
                    <StatusBadge status={option.value} />
                  </div>
                  <p className="text-sm text-gray-500">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Status Change Preview */}
        {selectedStatus !== task.status && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-blue-700">Status will change:</span>
              <StatusBadge status={task.status} />
              <span className="text-blue-700">→</span>
              <StatusBadge status={selectedStatus} />
            </div>
          </div>
        )}

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
            type="submit"
            disabled={loading || selectedStatus === task.status}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateStatusModal;