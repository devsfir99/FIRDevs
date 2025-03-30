import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchService } from '../../services/searchService';

export const searchUsers = createAsyncThunk(
  'search/users',
  async (query: string) => {
    const response = await searchService.searchUsers(query);
    return response.data;
  }
);

export const searchPosts = createAsyncThunk(
  'search/posts',
  async (query: string) => {
    const response = await searchService.searchPosts(query);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    users: [],
    posts: [],
    projects: [],
    hashtags: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.users = [];
      state.posts = [];
      state.projects = [];
      state.hashtags = [];
    },
  },
  extraReducers: (builder) => {
    // Add cases for all search thunks
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;