import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument, toHaveClass

// Import the component you are testing
import Header from '../../../components/layout/Header';

/**
 * @file Unit tests for the Header component.
 *
 * These tests ensure that the Header component renders all expected
 * static content, dynamic elements, and correctly handles user interactions,
 * specifically the 'New Task' button click. It also verifies the presence
 * of elements intended for different screen sizes.
 */
describe('Header', () => {
  // Mock function for the onCreateTask prop
  const mockOnCreateTask = jest.fn();

  // Clear mock calls before each test to ensure test isolation
  beforeEach(() => {
    mockOnCreateTask.mockClear();
  });

  /**
   * Test Case 1: Renders the main title and subtitle.
   *
   * This test verifies that the application's main title ("🏛️ HMCTS Task Manager")
   * and the descriptive subtitle ("Caseworker Digital Service") are correctly displayed.
   */
  it('renders the main title and subtitle', () => {
    render(<Header onCreateTask={mockOnCreateTask} />);

    // Assert that the main title is in the document
    expect(screen.getByText('🏛️ HMCTS Task Manager')).toBeInTheDocument();
    // Assert that the subtitle is in the document (it has a 'hidden md:block' class)
    // We can still find it even if it's hidden by CSS, as it's in the DOM.
    expect(screen.getByText('Caseworker Digital Service')).toBeInTheDocument();
  });

  /**
   * Test Case 2: Renders the mock user info.
   *
   * This test checks for the presence of the placeholder user icon and text,
   * which are typically hidden on smaller screens (`hidden md:flex`).
   */
  it('renders the mock user info', () => {
    render(<Header onCreateTask={mockOnCreateTask} />);

    // Assert that the user icon and text are in the document
    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('Caseworker')).toBeInTheDocument();
  });

  /**
   * Test Case 3: Renders the "New Task" button with its icon.
   *
   * This test ensures the button meant for creating new tasks is present
   * and contains both its text label and the SVG icon. It also checks for
   * the responsive text change (full text vs. '+').
   */
  it('renders the "New Task" button with its icon', () => {
    render(<Header onCreateTask={mockOnCreateTask} />);

    // Find the button by its accessible name (text content)
    const newTaskButton = screen.getByRole('button', { name: /new task|\+/i }); // Matches "New Task" or "+"

    expect(newTaskButton).toBeInTheDocument();
    // Check for the presence of the SVG icon (can be tricky without a specific role/label)
    // We'll look for an svg element within the button
    expect(newTaskButton.querySelector('svg')).toBeInTheDocument();

    // Check for both responsive texts
    expect(screen.getByText('New Task')).toHaveClass('hidden sm:inline');
    expect(screen.getByText('+')).toHaveClass('sm:hidden');
  });

  /**
   * Test Case 4: Calls `onCreateTask` when the "New Task" button is clicked.
   *
   * This is a crucial interaction test, ensuring that the button's `onClick`
   * prop is correctly wired up and the provided callback is invoked.
   */
  it('calls onCreateTask when the "New Task" button is clicked', () => {
    render(<Header onCreateTask={mockOnCreateTask} />);

    // Find the button
    const newTaskButton = screen.getByRole('button', { name: /new task|\+/i });

    // Simulate a click event on the button
    fireEvent.click(newTaskButton);

    // Assert that the mockOnCreateTask function was called exactly once
    expect(mockOnCreateTask).toHaveBeenCalledTimes(1);
  });

  /**
   * Test Case 5: Ensures correct styling classes are applied.
   *
   * This test is a general check for some expected Tailwind classes on the
   * main header element, ensuring the basic layout and appearance are correct.
   */
  it('applies correct styling classes to the header', () => {
    render(<Header onCreateTask={mockOnCreateTask} />);

    // Get the header element by its role or tag name
    const headerElement = screen.getByRole('banner'); // The <header> tag has an implicit role of 'banner'
    expect(headerElement).toHaveClass('bg-white');
    expect(headerElement).toHaveClass('shadow-sm');
    expect(headerElement).toHaveClass('border-b');
    expect(headerElement).toHaveClass('border-gray-200');

    // Check for the flex container within the header
    const innerDiv = headerElement.querySelector('.flex.items-center.justify-between.h-16');
    expect(innerDiv).toBeInTheDocument();
  });
});