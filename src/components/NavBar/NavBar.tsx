import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { CustomLink } from '../CustomLink';
import { DesktopMenuItems } from './DesktopMenuItems';
import { MobileMenuItems } from './MobileMenuItems';
import { config } from '../../config';
import { IHandleOpenMenu, IHandleCloseMenu } from './common';

export function NavBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu: IHandleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu: IHandleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomLink to={config.urls.public.root}>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
                {config.appTitle}
              </Typography>
            </CustomLink>

            <DesktopMenuItems handleCloseNavMenu={handleCloseNavMenu} />

            <MobileMenuItems
              anchorElNav={anchorEl}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
