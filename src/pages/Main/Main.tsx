import Box from '@mui/material/Box';

export function Main() {
  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <h2>Welcome to the Main page!</h2>
      <p>Some text here...</p>
    </Box>
  );
}
