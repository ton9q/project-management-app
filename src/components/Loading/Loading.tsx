import { useTheme } from '@mui/material/styles';
import { Backdrop } from '@mui/material';
import { GooSpinner } from './GooSpinner';

export function Loading({ fullScreen = false }) {
  const theme = useTheme();

  const styles = fullScreen
    ? {
        zIndex: theme.zIndex.drawer + 1,
      }
    : {
        position: 'absolute',
        zIndex: theme.zIndex.appBar - 1,
      };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        ...styles,
      }}
      open
    >
      <GooSpinner color={theme.palette.primary.main} size={80} />
    </Backdrop>
  );
}
