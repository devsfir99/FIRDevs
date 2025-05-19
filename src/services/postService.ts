import api from './api';

export const postService = {
  getPosts: (page: number = 1) => 
    api.get(`/posts?page=${page}`),
    
  createPost: (postData: { content: string, images?: string[] }) => 
    api.post('/posts', postData),
    
  likePost: (postId: string) => 
    api.post(`/posts/${postId}/like`),
    
  commentPost: (postId: string, content: string) => 
    api.post(`/posts/${postId}/comment`, { content }),
};

export default postService; 