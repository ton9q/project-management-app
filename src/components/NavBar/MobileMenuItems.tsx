import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { CustomLink } from '../CustomLink';
import {
  IHandleOpenMenu,
  IHandleCloseMenu,
  menuItems,
  styleForAny,
  styleForActive,
  mobileMenuBreakPoint,
} from './common';

type Props = {
  anchorElNav: HTMLElement | null;
  handleOpenNavMenu: IHandleOpenMenu;
  handleCloseNavMenu: IHandleCloseMenu;
};

export function MobileMenuItems({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu }: Props) {
  return (
    <Box sx={{ display: { xs: 'flex', [mobileMenuBreakPoint]: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {menuItems.map((menuItem) => (
          <CustomLink
            key={menuItem.title}
            to={menuItem.link}
            style={styleForAny}
            styleForActive={styleForActive}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{menuItem.title}</Typography>
            </MenuItem>
          </CustomLink>
        ))}
      </Menu>
    </Box>
  );
}
