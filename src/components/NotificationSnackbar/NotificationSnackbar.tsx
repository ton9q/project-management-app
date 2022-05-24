import { useAppDispatch, useAppSelector } from '../../store';
import {
  hideNotification,
  notificationsSelector,
  removeNotification,
} from '../../store/notificationsSlice';
import { Notification } from './Notification';

export function NotificationSnackbar() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationsSelector);

  const handleNotificationClose = (notificationId: string) => () => {
    dispatch(hideNotification(notificationId));
  };

  const handleNotificationExited = (notificationId: string) => () => {
    dispatch(removeNotification(notificationId));
  };

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          show={notification.show}
          onClose={handleNotificationClose(notification.id)}
          onExited={handleNotificationExited(notification.id)}
        />
      ))}
    </>
  );
}
