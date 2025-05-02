import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import projectReducer from './slices/projectsSlice';
import notificationReducer from './slices/notificationSlice';
import searchReducer from './slices/searchSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    projects: projectReducer,
    notifications: notificationReducer,
    search: searchReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 