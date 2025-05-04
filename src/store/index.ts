import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import projectsReducer from './slices/projectsSlice';
import notificationsReducer from './slices/notificationsSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 