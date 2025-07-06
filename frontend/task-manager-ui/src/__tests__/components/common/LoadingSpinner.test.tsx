import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument

// Import the component you are testing
import LoadingSpinner from '../../../components/common/LoadingSpinner';

/**
 * @file Unit tests for the LoadingSpinner component.
 *
 * These tests ensure that the LoadingSpinner component renders correctly
 * under various conditions, including default state and different size props.
 * They focus on the visual output and accessibility attributes of the component.
 */
describe('LoadingSpinner', () => {
  /**
   * Test Case 1: Renders with default (medium) size.
   *
   * This test verifies that when no 'size' prop is provided, the component
   * defaults to the medium size, indicated by the presence of the 'h-6 w-6' Tailwind classes.
   * It also checks for the 'status' role for accessibility and 'sr-only' text.
   */
  it('renders with default (medium) size', () => {
    // Render the component without any props
    render(<LoadingSpinner />);

    // Use screen.getByRole to find the element that has the ARIA role 'status',
    // which is the main spinner div. This is an accessibility-first approach.
    const spinnerElement = screen.getByRole('status', { name: 'Loading' }); // Name helps distinguish if multiple status roles are present

    // Assert that the spinner element is present in the document
    expect(spinnerElement).toBeInTheDocument();

    // Assert that the default size classes are applied
    expect(spinnerElement).toHaveClass('h-6 w-6');

    // Assert that the screen reader only text is present for accessibility
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  /**
   * Test Case 2: Renders with 'sm' (small) size.
   *
   * This test ensures that when the 'size' prop is set to 'sm', the
   * corresponding small size Tailwind classes ('h-4 w-4') are applied.
   */
  it('renders with "sm" (small) size', () => {
    // Render the component with the 'size' prop set to 'sm'
    render(<LoadingSpinner size="sm" />);
    const spinnerElement = screen.getByRole('status', { name: 'Loading' });

    // Assert that the small size classes are applied
    expect(spinnerElement).toHaveClass('h-4 w-4');
    // Ensure default size classes are NOT applied
    expect(spinnerElement).not.toHaveClass('h-6 w-6');
  });

  /**
   * Test Case 3: Renders with 'lg' (large) size.
   *
   * This test confirms that providing 'lg' to the 'size' prop results in
   * the large size Tailwind classes ('h-8 w-8') being correctly applied.
   */
  it('renders with "lg" (large) size', () => {
    // Render the component with the 'size' prop set to 'lg'
    render(<LoadingSpinner size="lg" />);
    const spinnerElement = screen.getByRole('status', { name: 'Loading' });

    // Assert that the large size classes are applied
    expect(spinnerElement).toHaveClass('h-8 w-8');
    // Ensure default size classes are NOT applied
    expect(spinnerElement).not.toHaveClass('h-6 w-6');
  });

  /**
   * Test Case 4: Applies custom className.
   *
   * This test verifies that any additional CSS classes passed via the 'className'
   * prop are correctly appended to the main container div of the component,
   * allowing for custom styling.
   */
  it('applies custom className', () => {
    const customClass = 'mt-4 mb-2';
    // Render the component with a custom className
    render(<LoadingSpinner className={customClass} />);

    // Get the main container div (the outermost div)
    // We expect the custom class to be on the div that wraps the spinner itself.
    // Using `container.firstChild` can be brittle if component structure changes.
    // A better approach for finding the outermost element might be to give it a testid
    // or to assert on the class of the element that *contains* the role="status" element.
    // For this simple component, we know the custom class is on the outer div.
    // We can use debug() or inspect the DOM to find a more robust selector if needed.
    // For now, let's target the parent of the spinner using screen.getByRole and then its parent.
    const spinnerRoleElement = screen.getByRole('status', { name: 'Loading' });
    const outerContainerElement = spinnerRoleElement.parentElement;

    // Assert that the outer container has the custom class
    expect(outerContainerElement).toHaveClass(customClass);
    expect(outerContainerElement).toHaveClass('flex'); // Also check a default class on this div to confirm it's the right element
  });
});