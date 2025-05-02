import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import projectsReducer from './slices/projectsSlice';
import notificationsReducer from './slices/notificationsSlice';
import searchReducer from './slices/searchSlice';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
    search: searchReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 