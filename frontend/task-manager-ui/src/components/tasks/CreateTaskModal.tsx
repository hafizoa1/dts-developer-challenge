import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import CreateTaskModal from '../../../components/tasks/CreateTaskModal';

// Inline mock for Modal
jest.mock('../../../components/common/Modal', () => {
  return function MockModal({ isOpen, onClose, title, children }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="mock-modal">
        <h3>{title}</h3>
        {children}
      </div>
    );
  };
});

describe('CreateTaskModal', () => {
  const mockOnClose = jest.fn();
  const mockOnCreateTask = jest.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup();
  });

  // Test 1: Modal renders when open
  it('renders when isOpen is true', () => {
    render(
      <CreateTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onCreateTask={mockOnCreateTask}
      />
    );

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Task' })).toBeInTheDocument();
  });

  // Test 2: Form validation - title required
  it('shows error when title is empty', async () => {
    render(
      <CreateTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onCreateTask={mockOnCreateTask}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Create Task' }));
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(mockOnCreateTask).not.toHaveBeenCalled();
  });

  // Test 3: Successful submission
  it('submits form with valid data', async () => {
    mockOnCreateTask.mockResolvedValue(undefined);

    render(
      <CreateTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onCreateTask={mockOnCreateTask}
      />
    );

    await user.type(screen.getByLabelText(/Task Title/i), 'Test Task');
    await user.click(screen.getByRole('button', { name: 'Create Task' }));

    expect(mockOnCreateTask).toHaveBeenCalledWith({
      title: 'Test Task',
      description: undefined,
      status: 'TODO',
      dueDate: undefined,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Test 4: Error handling
  it('shows error when submission fails', async () => {
    mockOnCreateTask.mockRejectedValue(new Error('API Error'));

    render(
      <CreateTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onCreateTask={mockOnCreateTask}
      />
    );

    await user.type(screen.getByLabelText(/Task Title/i), 'Test Task');
    await user.click(screen.getByRole('button', { name: 'Create Task' }));

    await waitFor(() => {
      expect(screen.getByText('Failed to create task. Please try again.')).toBeInTheDocument();
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});