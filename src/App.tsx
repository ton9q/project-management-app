import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import { ErrorFallback } from './components/ErrorFallback';
import { Layout } from './components/Layout';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

import { theme } from './theme';
import { config } from './config';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
            <CssBaseline />
            <Routes>
              <Route path={config.urls.public.root} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={config.urls.public.about} element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Box>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
