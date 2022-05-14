import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { config } from '../../config';

export function SignIn() {
  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <h2>SignIn page!</h2>
      <nav>
        <Link to={config.urls.public.main}>Main</Link>
      </nav>
    </Box>
  );
}
