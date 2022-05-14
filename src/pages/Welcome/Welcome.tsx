import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { config } from '../../config';

export function Welcome() {
  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Box sx={{ height: '1400px' }}>
        <h2>Welcome page</h2>
        <nav>
          <Link to={config.urls.public.main}>Main</Link>
        </nav>
      </Box>
    </Box>
  );
}
