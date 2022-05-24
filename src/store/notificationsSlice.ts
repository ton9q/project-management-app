import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  show: boolean;
};
type ActionNotification = Omit<Notification, 'id' | 'show'>;

type State = Notification[];

const initialState: State = [];

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state: State, action: PayloadAction<ActionNotification>) {
      state.forEach((notification) => {
        notification.show = false;
      });
      state.push({
        ...action.payload,
        id: String(Date.now()),
        show: true,
      });
    },
    hideNotification(state: State, action: PayloadAction<Notification['id']>) {
      const notification = state.find((notification) => notification.id === action.payload);
      if (notification) {
        notification.show = false;
      }
    },
    removeNotification(state: State, action: PayloadAction<Notification['id']>) {
      const notificationIndex = state.findIndex(
        (notification) => notification.id === action.payload
      );
      if (notificationIndex !== -1) {
        state.splice(notificationIndex, 1);
      }
    },
  },
});

export const { showNotification, hideNotification, removeNotification } = notificationSlice.actions;
export const notificationsSelector = (state: RootState) => state.notifications;

export default notificationSlice.reducer;
