import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';

import { ErrorFallback } from './components/ErrorFallback';
import { Layout } from './components/Layout';

import { Welcome } from './pages/Welcome';
import { Main } from './pages/Main';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { NotFound } from './pages/NotFound';

import { theme } from './theme';
import { config } from './config';
import { setupStore } from './Store/store';

function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
              <CssBaseline />
              <Routes>
                <Route path={config.urls.public.root} element={<Layout />}>
                  <Route index element={<Welcome />} />
                  <Route path={config.urls.public.main} element={<Main />} />
                  <Route path={config.urls.public.signIn} element={<SignIn />} />
                  <Route path={config.urls.public.signUp} element={<SignUp />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Box>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
