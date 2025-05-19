import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  ios: "http://localhost:3001/api",
  android: "http://10.0.2.2:3001/api"
}); // Platform'a göre doğru host seçilir

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiAuthService = {
    login: (data: {email: string, sifre: string}) => api.post('/auth/login', data),
    register: (data: {ad: string, soyad: string, email: string, sifre: string}) => api.post('/auth/register', data),
    logout: () => AsyncStorage.removeItem('token'),
    getCurrentUser: () => api.get('/auth/me'),
};

export const userService = {
    getProfile: () => 
      api.get('/user/profile'),
    updateProfile: (userData: any) => 
      api.put('/user/profile', userData),
    uploadAvatar: (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return api.post('/user/avatar', formData);
    },
  };
  
  export const postService = {
    getPosts: (page: number = 1) => 
      api.get(`/posts?page=${page}`),
    createPost: (postData: any) => 
      api.post('/posts', postData),
    getPost: (id: string) => 
      api.get(`/posts/${id}`),
    updatePost: (id: string, postData: any) => 
      api.put(`/posts/${id}`, postData),
    deletePost: (id: string) => 
      api.delete(`/posts/${id}`),
    likePost: (id: string) => 
      api.post(`/posts/${id}/like`),
    commentPost: (id: string, comment: string) => 
      api.post(`/posts/${id}/comments`, { comment }),
  };
  
  export const projectService = {
    getProjects: () => 
      api.get('/projects'),
    createProject: (projectData: any) => 
      api.post('/projects', projectData),
    getProject: (id: string) => 
      api.get(`/projects/${id}`),
    updateProject: (id: string, projectData: any) => 
      api.put(`/projects/${id}`, projectData),
    deleteProject: (id: string) => 
      api.delete(`/projects/${id}`),
  };
  
  export const notificationService = {
    getNotifications: () => 
      api.get('/notifications'),
    markAsRead: (id: string) => 
      api.put(`/notifications/${id}/read`),
    markAllAsRead: () => 
      api.put('/notifications/read-all'),
  };
  
  export default api;





