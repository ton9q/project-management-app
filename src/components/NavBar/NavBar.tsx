import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { CustomLink } from '../CustomLink';
import { DesktopMenuItems } from './DesktopMenuItems';
import { MobileMenuItems } from './MobileMenuItems';

import { LocalStorage } from '../../utils/localStorage';
import { config, localization } from '../../config';
import { IHandleOpenMenu, IHandleCloseMenu } from './common';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UserMenu } from './UserMenu';

const languageVariable = 'language';

function AppLogo() {
  return (
    <CustomLink to={config.urls.public.root}>
      <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
        {config.appTitle}
      </Typography>
    </CustomLink>
  );
}

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation('common');

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [language, setLanguage] = useState<localization.Languages>(
    LocalStorage.getItem(languageVariable) || localization.defaultLanguage
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    LocalStorage.setItem(languageVariable, language);
  }, [i18n, language]);

  const handleOpenNavMenu: IHandleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu: IHandleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: localization.Languages) => {
    setLanguage(language);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {location.pathname !== config.urls.public.main ? (
            <>
              <AppLogo />
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <LanguageSwitcher language={language} onChange={handleLanguageChange} />
                <Button onClick={() => navigate('/sign-in')} variant="contained">
                  {t('navbar.sign_in')}
                </Button>
                <Button onClick={() => navigate('/sign-up')} variant="contained">
                  {t('navbar.sign_up')}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AppLogo />
                <DesktopMenuItems handleCloseNavMenu={handleCloseNavMenu} />
                <MobileMenuItems
                  anchorElNav={anchorEl}
                  handleOpenNavMenu={handleOpenNavMenu}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <LanguageSwitcher language={language} onChange={handleLanguageChange} />
                <UserMenu />
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
