import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { config } from '../../config';

export function NotFound() {
  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <h2>404</h2>
      <p>The page not found</p>
      <nav>
        <Link to={config.urls.public.home}>Home</Link>
      </nav>
    </Box>
  );
}
