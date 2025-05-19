import api from './api';

export const projectService = {
  getProjects: () => 
    api.get('/projects'),
    
  createProject: (projectData: {
    title: string;
    description: string;
    technology: string;
    status?: string;
    image?: string;
  }) => 
    api.post('/projects', projectData),
    
  updateProject: (projectId: string, projectData: {
    title?: string;
    description?: string;
    technology?: string;
    status?: string;
    image?: string;
  }) => 
    api.put(`/projects/${projectId}`, projectData),
    
  likeProject: (projectId: string) => 
    api.post(`/projects/${projectId}/like`),
    
  commentProject: (projectId: string, content: string) => 
    api.post(`/projects/${projectId}/comment`, { content }),
    
  manageMember: (projectId: string, memberId: string) => 
    api.post(`/projects/${projectId}/members`, { memberId }),
};

export default projectService; 