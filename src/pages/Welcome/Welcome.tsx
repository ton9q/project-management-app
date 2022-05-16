import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { config } from '../../config';

export function Welcome() {
  const { t } = useTranslation(['common', 'page_welcome']);

  return (
    <Box
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
    >
      <Box sx={{ height: '1400px' }}>
        <h2>{t('page_welcome:header')}</h2>
        <nav>
          <Link to={config.urls.public.main}>{t('common:pages.main')}</Link>
        </nav>
      </Box>
    </Box>
  );
}
