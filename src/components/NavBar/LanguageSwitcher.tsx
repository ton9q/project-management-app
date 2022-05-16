import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flags from 'country-flag-icons/react/1x1';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Languages } from '../../config/localization';

const flagStyle = { borderRadius: '50%' };

type Props = {
  language: Languages;
  onChange: (language: Languages) => void;
};

export function LanguageSwitcher({ language, onChange }: Props) {
  const { t } = useTranslation('common');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: Languages) => {
    onChange(language);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ p: 0, width: 30, height: 30 }}>
        {language === Languages.En ? (
          <Flags.US style={flagStyle} />
        ) : (
          <Flags.RU style={flagStyle} />
        )}
      </IconButton>
      <Menu
        sx={{ mt: '13px' }}
        id="menu-language"
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
        <MenuItem onClick={() => handleLanguageChange(Languages.En)}>
          {t('languages.english')}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange(Languages.Ru)}>
          {t('languages.russian')}
        </MenuItem>
      </Menu>
    </>
  );
}
