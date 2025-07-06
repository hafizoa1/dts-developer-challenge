import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers

// Import the component you are testing
import Modal from '../../../components/common/Modal';

/**
 * @file Unit tests for the Modal component.
 *
 * These tests cover various functionalities of the Modal component,
 * including its visibility based on the `isOpen` prop, content rendering,
 * different size variations, and interaction handling (closing via backdrop,
 * close button, and Escape key). It also verifies side effects on the body overflow.
 */
describe('Modal', () => {
  // Mock function for onClose prop
  const mockOnClose = jest.fn();

  // Reset mocks before each test to ensure isolation
  beforeEach(() => {
    mockOnClose.mockClear();
    // Ensure body overflow is reset for tests that might not explicitly close the modal
    document.body.style.overflow = 'unset';
  });

  /**
   * Test Case 1: Does not render when `isOpen` is false.
   *
   * This test verifies that the modal component returns `null` and
   * does not render any part of its UI to the document when `isOpen` is false.
   */
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal" >
        <div>Modal Content</div>
      </Modal>
    );

    // Assert that the modal title is not in the document
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    // Assert that the modal content is not in the document
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  /**
   * Test Case 2: Renders correctly when `isOpen` is true.
   *
   * This test ensures that when the modal is open, its title and children content
   * are visible in the document. It also checks for the presence of the close button.
   */
  it('renders correctly when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal Title">
        <p>This is the modal content.</p>
      </Modal>
    );

    // Assert that the title is displayed
    expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
    // Assert that the children content is displayed
    expect(screen.getByText('This is the modal content.')).toBeInTheDocument();
    // Assert that the close button is present (by its accessible name)
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  /**
   * Test Case 3: Calls `onClose` when backdrop is clicked.
   *
   * This test simulates a click on the modal's backdrop and verifies that
   * the `onClose` callback function is triggered, indicating the modal can be
   * dismissed by clicking outside its main content area.
   */
  it('calls onClose when backdrop is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    // Find the backdrop element (the div with bg-opacity-50) and click it.
    // We can target it by its class that includes 'bg-opacity-50'
    const backdrop = screen.getByTestId('modal-backdrop'); // Add data-testid="modal-backdrop" to your backdrop div for easier targeting
    // Alternatively, if you can't add data-testid, you might need to target the outermost div
    // or rely on element structure if it's unique enough, e.g., container.querySelector('.bg-opacity-50')
    fireEvent.click(backdrop);

    // Assert that onClose was called once
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test Case 4: Calls `onClose` when the close button is clicked.
   *
   * This test verifies that clicking the dedicated close button within the modal
   * successfully invokes the `onClose` callback, allowing the user to dismiss the modal.
   */
  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    // Find the close button by its accessible label and click it
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    // Assert that onClose was called once
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test Case 5: Calls `onClose` when Escape key is pressed.
   *
   * This test simulates a keyboard event for the 'Escape' key and ensures that
   * the modal correctly responds by calling the `onClose` function, providing
   * an alternative dismissal method.
   */
  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    // Simulate a keydown event for the 'Escape' key on the document body
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    // Assert that onClose was called once
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test Case 6: Prevents `onClose` when modal content is clicked.
   *
   * This test ensures that clicking inside the modal's content area (which
   * has `stopPropagation`) does not trigger the `onClose` callback, preventing
   * accidental dismissal when interacting with modal elements.
   */
  it('does not call onClose when modal content is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <button>Inside Modal</button> {/* Add a button inside for easy clicking */}
      </Modal>
    );

    // Find the button inside the modal and click it
    fireEvent.click(screen.getByText('Inside Modal'));

    // Assert that onClose was NOT called
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  /**
   * Test Case 7: Applies 'sm' (small) size classes.
   *
   * This test checks if the modal's main content area correctly applies
   * the Tailwind classes associated with the 'sm' size prop (`max-w-md`).
   */
  it('applies "sm" size classes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Small Modal" size="sm">
        <div>Content</div>
      </Modal>
    );

    // The modal content div (the one with `onClick={e => e.stopPropagation()}`)
    // should have the size classes. We can find it by checking for the shadow-xl class
    // or by its role if it had one, but its structure makes it unique here.
    // Using a combination of classes for better targeting.
    const modalContent = screen.getByText('Content').closest('.shadow-xl'); // Find content, then find its closest ancestor with shadow-xl
    expect(modalContent).toHaveClass('max-w-md');
    expect(modalContent).not.toHaveClass('max-w-2xl'); // Ensure default is not applied
  });

  /**
   * Test Case 8: Applies 'lg' (large) size classes.
   *
   * Similar to the 'sm' test, this verifies that the 'lg' size prop correctly
   * applies its associated Tailwind classes (`max-w-4xl`) to the modal's content.
   */
  it('applies "lg" size classes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Large Modal" size="lg">
        <div>Content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Content').closest('.shadow-xl');
    expect(modalContent).toHaveClass('max-w-4xl');
    expect(modalContent).not.toHaveClass('max-w-2xl');
  });

  /**
   * Test Case 9: Applies default (medium) size classes.
   *
   * This test ensures that if no `size` prop is provided, the modal defaults
   * to the medium size classes (`max-w-2xl`).
   */
  it('applies default (medium) size classes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Default Modal">
        <div>Content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Content').closest('.shadow-xl');
    expect(modalContent).toHaveClass('max-w-2xl');
  });

  /**
   * Test Case 10: Disables body scroll when modal is open.
   *
   * This test verifies the side effect on the document body's style:
   * when the modal is open, `document.body.style.overflow` should be set to 'hidden'.
   */
  it('disables body scroll when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    expect(document.body).toHaveStyle('overflow: hidden');
  });

  /**
   * Test Case 11: Re-enables body scroll when modal is closed.
   *
   * This test ensures that when the modal is unmounted (e.g., due to `isOpen` becoming false),
   * the `useEffect` cleanup function correctly resets `document.body.style.overflow` to 'unset'.
   */
  it('re-enables body scroll when modal is closed', () => {
    const { unmount, rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    // First, verify it's hidden when open
    expect(document.body).toHaveStyle('overflow: hidden');

    // Now, simulate closing the modal by changing isOpen to false
    rerender(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    // Wait for any potential async state updates, though for useEffect cleanup, it's often synchronous.
    // Using waitFor is good practice for effects that might not be immediate.
    waitFor(() => {
        expect(document.body).toHaveStyle('overflow: unset');
    });

    // Alternatively, for cleanup on unmount:
    // unmount();
    // expect(document.body).toHaveStyle('overflow: unset');
  });
});