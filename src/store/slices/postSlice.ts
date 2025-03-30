import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from '../../services/api';

export const likePost = createAsyncThunk(
  'posts/like',
  async (postId: string) => {
    const response = await postService.likePost(postId);
    return response.data;
  }
);

export const commentOnPost = createAsyncThunk(
  'posts/comment',
  async ({ postId, comment }: { postId: string; comment: string }) => {
    const response = await postService.commentPost(postId, comment);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add cases for post interaction thunks
  },
});

export default postsSlice.reducer;