import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostsState, Post, Comment } from '../types';
import { mockPosts, mockUsers } from '../../services/mockData';
import { addNotification } from './notificationsSlice';
import { AppDispatch, RootState } from '../types';

const initialState: PostsState = {
  items: mockPosts,
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  likedPosts: [],
};

// Thunks
export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPosts;
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: { content: string; images?: string[] }) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentUser = mockUsers[0]; // Şu an için sabit kullanıcı
    const newPost: Post = {
      id: String(Date.now()),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: postData.content,
      images: postData.images,
      likes: 0,
      comments: 0,
      commentsList: [],
      createdAt: new Date().toISOString(),
    };

    return newPost;
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId: string, { getState, dispatch }) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const state = getState() as RootState;
    const post = state.posts.items.find(p => p.id === postId);

    if (post) {
      // Bildirim oluştur
      dispatch(addNotification({
        id: String(Date.now()),
        type: 'like',
        read: false,
        createdAt: new Date().toISOString(),
        data: {
          userId: mockUsers[0].id,
          userName: mockUsers[0].name,
          postId: post.id,
        },
      }));
    }

    return { postId };
  }
);

export const commentOnPost = createAsyncThunk(
  'posts/commentOnPost',
  async ({ postId, comment }: { postId: string; comment: string }, { getState, dispatch }) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentUser = mockUsers[0];
    const newComment = {
      id: String(Date.now()),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: comment,
      createdAt: new Date().toISOString(),
    };

    // Bildirim oluştur
    dispatch(addNotification({
      id: String(Date.now()),
      type: 'comment',
      read: false,
      createdAt: new Date().toISOString(),
      data: {
        userId: currentUser.id,
        userName: currentUser.name,
        postId,
        comment,
      },
    }));

    return { postId, comment: newComment };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      const post = state.items.find((p: Post) => p.id === postId);
      if (post) {
        const likedIndex = state.likedPosts.indexOf(postId);
        if (likedIndex !== -1) {
          state.likedPosts.splice(likedIndex, 1);
          post.likes -= 1;
        } else {
          state.likedPosts.push(postId);
          post.likes += 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.items.find((p: Post) => p.id === action.payload.postId);
        if (post && !state.likedPosts.includes(action.payload.postId)) {
          post.likes += 1;
          state.likedPosts.push(action.payload.postId);
        }
      })
      // Comment on Post
      .addCase(commentOnPost.fulfilled, (state, action) => {
        const post = state.items.find((p: Post) => p.id === action.payload.postId);
        if (post) {
          post.comments += 1;
          post.commentsList = [...(post.commentsList || []), action.payload.comment];
        }
      });
  },
});

export const { toggleLike } = postsSlice.actions;
export default postsSlice.reducer; 