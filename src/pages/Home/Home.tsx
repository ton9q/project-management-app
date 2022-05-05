import Box from '@mui/material/Box';

export function Home() {
  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Box sx={{ height: '1400px' }}>
        <h2>Home page</h2>
      </Box>
    </Box>
  );
}
