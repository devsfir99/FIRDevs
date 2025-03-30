import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Project, ProjectsState } from '../types';
import { mockProjects, mockUsers } from '../../services/mockData';

const initialState: ProjectsState = {
  items: mockProjects,
  loading: false,
  error: null,
};

// Thunks
export const fetchProjects = createAsyncThunk<Project[]>(
  'projects/fetchProjects',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProjects;
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: { 
    title: string; 
    description: string; 
    technology: string;
    image?: string;
  }, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const state = getState() as any;
    const currentUser = state.auth.user || mockUsers[0];

    const newProject: Project = {
      id: String(Date.now()),
      title: projectData.title,
      description: projectData.description,
      technology: projectData.technology,
      status: 'Yeni',
      memberCount: 1,
      image: projectData.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: currentUser.id,
    };
    return newProject;
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ 
    projectId, 
    projectData 
  }: { 
    projectId: string; 
    projectData: Partial<Project>;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { projectId, ...projectData };
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Create Project
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update Project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.projectId);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
            updatedAt: new Date().toISOString(),
          };
        }
      });
  },
});

export default projectsSlice.reducer; 