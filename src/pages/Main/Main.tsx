import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { config } from '../../config';

export function Main() {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <h2>Welcome to the Main page!</h2>
      <button
        onClick={() => navigate(config.urls.public.board('e00f7812-ef8e-4618-ae1c-613392167e32'))}
      >
        Open Board 1
      </button>
      <p>Some text here...</p>
    </Box>
  );
}
