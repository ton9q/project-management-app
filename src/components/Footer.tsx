import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ton9q/project-management-app">
        GitHub
      </Link>
      {' 2022'}
    </Typography>
  );
}

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        px: 2,
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Typography variant="body1">RS School Course</Typography>
      <Copyright />
    </Box>
  );
}
