import axios from "axios";

const BASE_URL = "https://api.example.com";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    login: (data: any) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
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





