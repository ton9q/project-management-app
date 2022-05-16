import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CustomLink } from '../CustomLink';

import {
  IHandleCloseMenu,
  menuItems,
  styleForAny,
  styleForActive,
  mobileMenuBreakPoint,
} from './common';

type Props = {
  handleCloseNavMenu: IHandleCloseMenu;
};

export function DesktopMenuItems({ handleCloseNavMenu }: Props) {
  const { t } = useTranslation('common');

  return (
    <Box sx={{ display: { xs: 'none', [mobileMenuBreakPoint]: 'flex' } }}>
      {menuItems.map((menuItem) => (
        <CustomLink
          key={menuItem.title}
          to={menuItem.link}
          style={styleForAny}
          styleForActive={styleForActive}
        >
          <Button
            key={menuItem.title}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: 'white',
              display: 'block',
              marginTop: 0,
              marginBottom: 0,
              padding: '20px 10px',
            }}
          >
            {t(menuItem.title as 'pages.main')}
          </Button>
        </CustomLink>
      ))}
    </Box>
  );
}
