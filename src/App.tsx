import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import { Routes } from './router/Routes';

import { ErrorFallback } from './components/ErrorFallback';
import { NotificationSnackbar } from './components/NotificationSnackbar';

import { theme } from './theme';
import { setupStore } from './store';

function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
              <CssBaseline />
              <Routes />
              <NotificationSnackbar />
            </Box>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
