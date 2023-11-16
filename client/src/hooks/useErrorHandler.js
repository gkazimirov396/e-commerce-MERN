import { useEffect } from 'react';

import { useErrorBoundary } from 'react-error-boundary';

export const useErrorHandler = error => {
  const { showBoundary, resetBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!error) {
      return;
    }

    showBoundary(error);

    return resetBoundary;
  }, [error, showBoundary, resetBoundary]);
};
