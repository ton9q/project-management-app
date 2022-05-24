import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { NotificationType } from '../../store/notificationsSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  message: string;
  type: NotificationType;
  show?: boolean;
  onClose: () => void;
  onExited: () => void;
};

export function Notification({ message, type, show = true, onClose, onExited }: Props) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  const handleExited = () => {
    if (onExited) {
      onExited();
    }
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionProps={{
        onExited: handleExited,
      }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
