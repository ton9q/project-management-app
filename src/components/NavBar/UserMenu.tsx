import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { config } from '../../config';
import { signOut } from '../../store/authSlice';
import { useAppDispatch } from '../../store';

export function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const handleProfileClick = () => {
    navigate(config.urls.public.profile.edit);
  };

  const handleSignOutClick = () => {
    dispatch(signOut());
    navigate(config.urls.public.welcome);
  };

  const settings = [
    { key: 'navbar.profile', onClick: handleProfileClick },
    { key: 'navbar.sign_out', onClick: handleSignOutClick },
  ] as const;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('navbar.open_settings')}>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar" src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '8px' }}
        id="menu-user"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.key}
            onClick={() => {
              handleCloseMenu();
              setting.onClick();
            }}
          >
            <Typography textAlign="center">{t(setting.key)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
