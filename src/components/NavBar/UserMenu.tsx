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
import { LocalStorage } from '../../utils/localStorage';
import { config } from '../../config';
import { TOKEN } from '../../pages/registration/SignIn/SignIn';

const settings = ['navbar.profile', 'navbar.sign_out'] as const;

export function UserMenu() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logOut = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.innerText === 'Sign out') {
      LocalStorage.removeItem(TOKEN);
      navigate(config.urls.public.welcome);
    }
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
            key={setting}
            onClick={(event) => {
              handleCloseMenu();
              logOut(event);
            }}
          >
            <Typography textAlign="center">{t(setting)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
