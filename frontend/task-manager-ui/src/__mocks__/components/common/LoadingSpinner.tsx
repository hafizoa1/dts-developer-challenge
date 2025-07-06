// src/__mocks__/components/common/LoadingSpinner.tsx
import React from 'react';

// eslint-disable-next-line react/display-name
const MockLoadingSpinner: React.FC<any> = ({ size }) => (
  <div data-testid="mock-loading-spinner" data-size={size}>Loading...</div>
);

export default MockLoadingSpinner;