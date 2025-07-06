import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument, toHaveClass

// Import the component and its types
// Adjust the import path below to the correct location of StatsCards.tsx
import StatsCards from '../../../components/dashboard/StatsCard';
import { TaskStats } from '../../../types/Task'; // Adjust path if Task.ts is not directly under src/types

/**
 * @file Unit tests for the StatsCards component.
 *
 * These tests verify that the StatsCards component correctly renders
 * a set of statistical cards based on the provided `TaskStats` prop.
 * It ensures that each card displays the correct title, value, icon,
 * and applies the appropriate styling classes.
 */
describe('StatsCards', () => {

  /**
   * Define a mock `TaskStats` object to be used across tests.
   * This ensures consistent data for predictable test outcomes.
   */
  const mockStats: TaskStats = {
    total: 10,
    todo: 3,
    inProgress: 5,
    completed: 2,
  };

  /**
   * Test Case 1: Renders all four stat cards with correct titles and values.
   *
   * This test ensures that the component iterates through all defined card types
   * and displays their respective titles and the numerical values from the `stats` prop.
   */
  it('renders all four stat cards with correct titles and values', () => {
    render(<StatsCards stats={mockStats} />);

    // Test Total Tasks card
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // Expecting '10' as text for value

    // Test To Do card
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Test In Progress card
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    // Test Completed card
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  /**
   * Test Case 2: Displays correct icons for each stat card.
   *
   * This test verifies that each stat card renders its associated emoji icon.
   */
  it('displays correct icons for each stat card', () => {
    render(<StatsCards stats={mockStats} />);

    expect(screen.getByText('📋')).toBeInTheDocument(); // Total Tasks icon
    expect(screen.getByText('☐')).toBeInTheDocument(); // To Do icon
    expect(screen.getByText('⏳')).toBeInTheDocument(); // In Progress icon
    expect(screen.getByText('✅')).toBeInTheDocument(); // Completed icon
  });

  /**
   * Test Case 3: Applies correct background and text colors to each card based on status.
   *
   * This test checks the application of dynamic Tailwind CSS classes (bgColor, textColor)
   * to ensure each card is visually distinct as intended. We'll find the card by its title
   * and then assert on the classes of its parent container.
   */
  it('applies correct background and text colors to each card based on status', () => {
    render(<StatsCards stats={mockStats} />);

    // Helper function to find the card container by its title
    const getCardContainerByTitle = (title: string) =>
      screen.getByText(title).closest('div.rounded-lg'); // Find ancestor div with rounded-lg class

    // Test Total Tasks card styling
    const totalTasksCard = getCardContainerByTitle('Total Tasks');
    expect(totalTasksCard).toHaveClass('bg-blue-50');
    expect(totalTasksCard?.querySelector('.text-blue-600')).toBeInTheDocument(); // Icon color
    expect(totalTasksCard?.querySelector('.text-blue-900')).toBeInTheDocument(); // Title/value color

    // Test To Do card styling
    const toDoCard = getCardContainerByTitle('To Do');
    expect(toDoCard).toHaveClass('bg-gray-50');
    expect(toDoCard?.querySelector('.text-gray-600')).toBeInTheDocument();
    expect(toDoCard?.querySelector('.text-gray-900')).toBeInTheDocument();

    // Test In Progress card styling
    const inProgressCard = getCardContainerByTitle('In Progress');
    expect(inProgressCard).toHaveClass('bg-yellow-50');
    expect(inProgressCard?.querySelector('.text-yellow-600')).toBeInTheDocument();
    expect(inProgressCard?.querySelector('.text-yellow-900')).toBeInTheDocument();

    // Test Completed card styling
    const completedCard = getCardContainerByTitle('Completed');
    expect(completedCard).toHaveClass('bg-green-50');
    expect(completedCard?.querySelector('.text-green-600')).toBeInTheDocument();
    expect(completedCard?.querySelector('.text-green-900')).toBeInTheDocument();
  });

  /**
   * Test Case 4: Renders correctly with zero values.
   *
   * This test ensures the component handles cases where stat values are zero,
   * confirming that zeros are displayed correctly and do not cause rendering issues.
   */
  it('renders correctly with zero values', () => {
    const zeroStats: TaskStats = {
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0,
    };
    render(<StatsCards stats={zeroStats} />);

    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(4); // Ensure all four cards show '0'
  });

  /**
   * Test Case 5: Ensures accessibility attributes are present.
   *
   * While not explicitly defined by your current component, the `dl`, `dt`, `dd`
   * tags inherently provide semantic meaning. This test is more of a placeholder
   * for future accessibility checks if specific ARIA attributes are added.
   * For now, it simply confirms the presence of these semantic elements.
   */
  it('ensures accessibility attributes are present', () => {
    render(<StatsCards stats={mockStats} />);

    // Check for definition list structure for each card's title/value pair
    expect(screen.getByText('Total Tasks').closest('dt')).toBeInTheDocument();
    expect(screen.getByText('10').closest('dd')).toBeInTheDocument();
  });
});