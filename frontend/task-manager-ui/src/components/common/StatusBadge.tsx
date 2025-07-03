import React from 'react';
import { TaskStatus } from '../../types/Task';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = (status: TaskStatus): string => {
    switch (status) {
      case 'TODO':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: TaskStatus): string => {
    switch (status) {
      case 'TODO':
        return '☐';
      case 'IN_PROGRESS':
        return '⏳';
      case 'COMPLETED':
        return '✅';
      default:
        return '❓';
    }
  };

  const getStatusLabel = (status: TaskStatus): string => {
    switch (status) {
      case 'TODO':
        return 'To Do';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
        status
      )} ${className}`}
    >
      <span className="mr-1">{getStatusIcon(status)}</span>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;