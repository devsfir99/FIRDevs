import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState, Notification } from '../types';
import { mockNotifications } from '../../services/mockData';

const initialState: NotificationsState = {
  items: mockNotifications,
  unread: mockNotifications.filter(n => !n.read).length,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk<Notification[]>(
  'notifications/fetchNotifications',
  async () => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockNotifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
      state.unread += 1;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unread = Math.max(0, state.unread - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(notification => {
        if (!notification.read) {
          notification.read = true;
        }
      });
      state.unread = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.unread = action.payload.filter(n => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { addNotification, markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer; 