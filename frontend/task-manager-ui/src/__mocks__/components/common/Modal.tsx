// src/__mocks__/components/common/Modal.tsx

import React from 'react';

// This mock simplifies the Modal component for testing purposes.
// It renders its children directly if isOpen is true, and passes through
// onClose and title props for verification if needed by the parent component's tests.
// It also adds a data-testid for the close button and backdrop for easier targeting.

// eslint-disable-next-line react/display-name
const MockModal: React.FC<any> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div data-testid="mock-modal">
      <div data-testid="mock-modal-backdrop" onClick={onClose} />
      <div data-testid="mock-modal-content">
        <h3 data-testid="mock-modal-title">{title}</h3>
        <button data-testid="mock-modal-close-button" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default MockModal;