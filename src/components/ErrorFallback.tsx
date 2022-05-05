import type { FallbackProps } from 'react-error-boundary';
import Container from '@mui/material/Container';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Container>
    <h2>ErrorBoundary</h2>
    <p>Something went wrong:</p>
    <pre>{JSON.stringify(error.message)}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </Container>
);
