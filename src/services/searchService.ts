import api from './api';

export const searchService = {
  searchUsers: (query: string) => 
    api.get(`/search/users?q=${query}`),
  
  searchPosts: (query: string) => 
    api.get(`/search/posts?q=${query}`),
  
  searchProjects: (query: string) => 
    api.get(`/search/projects?q=${query}`),
  
  searchHashtags: (query: string) => 
    api.get(`/search/hashtags?q=${query}`),
};