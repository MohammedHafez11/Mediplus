import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
  content: string;
  date: string;
  file: File | null;
  imageUrl?: string;
}

interface ProjectState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  status: 'idle',
  error: null,
};

export const fetchProjects = createAsyncThunk<Project[], void, { rejectValue: { message: string } }>(
  'project/fetchProjects',
  async (_, thunkAPI) => {
   
    try {
      const response = await axios.get('https://mediplus.runasp.net/Project/GetAll', {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch projects' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const fetchProjectById = createAsyncThunk<Project, number, { rejectValue: { message: string } }>(
  'project/fetchProjectById',
  async (projectId, thunkAPI) => {
   

    try {
      const response = await axios.get(`https://mediplus.runasp.net/Project/Get/${projectId}`, {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch project details' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const createProject = createAsyncThunk<Project, FormData, { rejectValue: { message: string } }>(
  'project/createProject',
  async (formData, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.post('https://mediplus.runasp.net/Project/Create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create project' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const updateProject = createAsyncThunk<Project, FormData, { rejectValue: { message: string } }>(
    'project/updateProject',
    async (formData, thunkAPI) => {
      const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;
  
      if (!token) {
        return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
      }
  
      const projectId = formData.get('id') as string;
  
      try {
        const response = await axios.put(`https://mediplus.runasp.net/Project/Update/${projectId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to update project' });
        } else {
          return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
        }
      }
    }
  );

export const deleteProject = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
  'project/deleteProject',
  async (projectId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      await axios.delete(`https://mediplus.runasp.net/Project/Delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete project' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch projects';
      })
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create project';
      })
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.status = 'succeeded';
        const updatedIndex = state.projects.findIndex(proj => proj.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.projects[updatedIndex] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update project';
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = state.projects.filter(proj => proj.id !== action.meta.arg);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete project';
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch project details';
      });
  },
});

export default projectSlice.reducer;