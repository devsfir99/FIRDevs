import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileState, User } from '../types';
import { mockUsers, mockPosts } from '../../services/mockData';

const initialState: ProfileState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId: string) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockUsers.find(u => u.id === userId);
    const userPosts = mockPosts.filter(p => p.userId === userId);
    
    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    return {
      user,
      posts: userPosts,
    };
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (userData: Partial<User>) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return userData;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.posts = action.payload.posts;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default profileSlice.reducer;