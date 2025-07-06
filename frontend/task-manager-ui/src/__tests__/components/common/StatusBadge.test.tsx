import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toHaveClass

// Import the component and its types
import StatusBadge from '../../../components/common/StatusBadge';
import { TaskStatus } from '../../../types/Task'; // Adjust path if Task.ts is not directly under src/types

/**
 * @file Unit tests for the StatusBadge component.
 *
 * These tests verify that the StatusBadge component correctly renders
 * different styles, icons, and labels based on the 'status' prop.
 * It ensures that the visual representation matches the expected output
 * for each defined task status (TODO, IN_PROGRESS, COMPLETED, and default/unknown).
 */
describe('StatusBadge', () => {

  /**
   * Test Case 1: Renders 'TODO' status correctly.
   *
   * This test ensures that when the status is 'TODO', the badge
   * displays the correct text label, icon, and applies the specific
   * Tailwind CSS classes for 'TODO' (blue theme).
   */
  it('renders "TODO" status correctly', () => {
    const status: TaskStatus = 'TODO';
    render(<StatusBadge status={status} />);

    // Assert that the correct label is displayed
    expect(screen.getByText('To Do')).toBeInTheDocument();
    // Assert that the correct icon is displayed (you might use getByText for characters)
    expect(screen.getByText('☐')).toBeInTheDocument();

    // Assert that the correct styling classes are applied
    const badgeElement = screen.getByText('To Do').closest('span'); // Get the span element containing the text
    expect(badgeElement).toHaveClass('bg-blue-100');
    expect(badgeElement).toHaveClass('text-blue-800');
    expect(badgeElement).toHaveClass('border-blue-200');
  });

  /**
   * Test Case 2: Renders 'IN_PROGRESS' status correctly.
   *
   * Similar to the 'TODO' test, this verifies the correct rendering
   * of the 'IN_PROGRESS' status, including its label, icon, and yellow-themed styles.
   */
  it('renders "IN_PROGRESS" status correctly', () => {
    const status: TaskStatus = 'IN_PROGRESS';
    render(<StatusBadge status={status} />);

    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('⏳')).toBeInTheDocument();

    const badgeElement = screen.getByText('In Progress').closest('span');
    expect(badgeElement).toHaveClass('bg-yellow-100');
    expect(badgeElement).toHaveClass('text-yellow-800');
    expect(badgeElement).toHaveClass('border-yellow-200');
  });

  /**
   * Test Case 3: Renders 'COMPLETED' status correctly.
   *
   * This test ensures that the 'COMPLETED' status is rendered with
   * its specific label, icon, and green-themed styling.
   */
  it('renders "COMPLETED" status correctly', () => {
    const status: TaskStatus = 'COMPLETED';
    render(<StatusBadge status={status} />);

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();

    const badgeElement = screen.getByText('Completed').closest('span');
    expect(badgeElement).toHaveClass('bg-green-100');
    expect(badgeElement).toHaveClass('text-green-800');
    expect(badgeElement).toHaveClass('border-green-200');
  });

  /**
   * Test Case 4: Renders default styles for an unknown status.
   *
   * This test covers the `default` case in the `switch` statements.
   * If an unknown or unexpected status string is provided, it should
   * display the raw status string as the label, the default icon,
   * and generic gray styling.
   */
  it('renders default styles for an unknown status', () => {
    // Cast to TaskStatus to bypass TypeScript type checking for this specific test
    const unknownStatus = 'UNKNOWN_STATUS' as TaskStatus;
    render(<StatusBadge status={unknownStatus} />);

    // Should display the raw status string as label
    expect(screen.getByText(unknownStatus)).toBeInTheDocument();
    // Should display the default icon
    expect(screen.getByText('❓')).toBeInTheDocument();

    const badgeElement = screen.getByText(unknownStatus).closest('span');
    expect(badgeElement).toHaveClass('bg-gray-100');
    expect(badgeElement).toHaveClass('text-gray-800');
    expect(badgeElement).toHaveClass('border-gray-200');
  });

  /**
   * Test Case 5: Applies custom className.
   *
   * This test confirms that any additional CSS classes passed via the
   * `className` prop are correctly appended to the badge's main `<span>` element,
   * allowing for external styling customization.
   */
  it('applies custom className', () => {
    const customClass = 'font-bold mt-2';
    render(<StatusBadge status="TODO" className={customClass} />);

    const badgeElement = screen.getByText('To Do').closest('span');
    expect(badgeElement).toHaveClass(customClass);
  });

  /**
   * Test Case 6: Contains common badge styling classes.
   *
   * This test verifies that the badge always includes its base styling classes,
   * ensuring it consistently appears as a badge regardless of the status.
   */
  it('contains common badge styling classes', () => {
    render(<StatusBadge status="COMPLETED" />);

    const badgeElement = screen.getByText('Completed').closest('span');
    expect(badgeElement).toHaveClass('inline-flex');
    expect(badgeElement).toHaveClass('items-center');
    expect(badgeElement).toHaveClass('px-2');
    expect(badgeElement).toHaveClass('py-1');
    expect(badgeElement).toHaveClass('rounded-full');
    expect(badgeElement).toHaveClass('text-xs');
    expect(badgeElement).toHaveClass('font-medium');
    expect(badgeElement).toHaveClass('border');
  });
});