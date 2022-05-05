import Box from '@mui/material/Box';

export function About() {
  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <h2>Welcome to the About page!</h2>
      <p>Some text here...</p>
    </Box>
  );
}
