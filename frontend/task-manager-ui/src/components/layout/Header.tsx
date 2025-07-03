import React from 'react';

interface HeaderProps {
  onCreateTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                🏛️ HMCTS Task Manager
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">
                Caseworker Digital Service
              </span>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* User Info (Mock) */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <span>👤</span>
              <span>Caseworker</span>
            </div>

            {/* Create Task Button */}
            <button
              onClick={onCreateTask}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;