import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument

// Import the component you are testing
import Footer from '../../../components/layout/Footer';

/**
 * @file Unit tests for the Footer component.
 *
 * These tests ensure that the Footer component renders all expected
 * static content, dynamic content (like the current year), and
 * navigations links correctly. It focuses on the presence and
 * correctness of text and link attributes.
 */
describe('Footer', () => {
  // Mock the Date object to control the current year for consistent testing
  // We'll set it to a specific year to ensure the dynamic year rendering is correct.
  const MOCK_YEAR = 2024;
  beforeAll(() => {
    jest.useFakeTimers(); // Enable Jest's fake timers
    jest.setSystemTime(new Date(MOCK_YEAR, 0, 1)); // Set the system time to Jan 1st, MOCK_YEAR
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore real timers after all tests in this suite
  });

  /**
   * Test Case 1: Renders the main title and description.
   *
   * This test verifies that the primary title ("🏛️ HMCTS Task Manager")
   * and its associated descriptive text are correctly displayed in the footer.
   */
  it('renders the main title and description', () => {
    render(<Footer />);

    // Assert that the main title is in the document
    expect(screen.getByText('🏛️ HMCTS Task Manager')).toBeInTheDocument();
    // Assert that the descriptive text is in the document
    expect(screen.getByText(/A digital service for caseworkers/i)).toBeInTheDocument();
    expect(screen.getByText(/efficiently manage their tasks/i)).toBeInTheDocument();
  });

  /**
   * Test Case 2: Renders all support links.
   *
   * This test checks for the presence of each expected link under the "Support" section,
   * ensuring their text content is correct.
   */
  it('renders all support links', () => {
    render(<Footer />);

    // Assert that the Support heading is present
    expect(screen.getByText('Support')).toBeInTheDocument();

    // Assert that each support link text is present
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Technical Support')).toBeInTheDocument();
  });

  /**
   * Test Case 3: Renders all legal links.
   *
   * This test checks for the presence of each expected link under the "Legal" section,
   * ensuring their text content is correct.
   */
  it('renders all legal links', () => {
    render(<Footer />);

    // Assert that the Legal heading is present
    expect(screen.getByText('Legal')).toBeInTheDocument();

    // Assert that each legal link text is present
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Accessibility Statement')).toBeInTheDocument();
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
  });

  /**
   * Test Case 4: Displays the current year in the copyright notice.
   *
   * This test leverages Jest's fake timers to ensure that the dynamically
   * rendered copyright year is accurate and matches the mocked system time.
   */
  it('displays the current year in the copyright notice', () => {
    render(<Footer />);

    // Construct the expected copyright text with the mocked year
    const expectedCopyrightText = `© ${MOCK_YEAR} Her Majesty's Courts and Tribunals Service (HMCTS). All rights reserved.`;
    expect(screen.getByText(expectedCopyrightText)).toBeInTheDocument();
  });

  /**
   * Test Case 5: Displays version information and service status.
   *
   * This test checks for the presence of static text indicating the build framework
   * and version number, as well as the visual service status indicator.
   */
  it('displays version information and service status', () => {
    render(<Footer />);

    expect(screen.getByText('Built with React & TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Version 1.0.0')).toBeInTheDocument();
    // Check for the presence of the service online indicator (the green dot)
    // We can target it by its title attribute if available, or just by its unique classes.
    expect(screen.getByTitle('Service Online')).toBeInTheDocument();
    expect(screen.getByTitle('Service Online')).toHaveClass('bg-green-500'); // Verify it's the green dot
  });

  /**
   * Test Case 6: Links have empty hrefs (placeholder behavior).
   *
   * This test confirms that the `href` attributes of the navigation links are
   * currently set to "#" as placeholders, indicating no actual navigation is
   * expected from them at this stage. In a real application, you'd likely
   * test for specific routes.
   */
  it('all links have "#" as their href', () => {
    render(<Footer />);

    // Get all anchor elements within the footer
    const links = screen.getAllByRole('link');

    // Assert that all found links have href="#"
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '#');
    });
  });
});