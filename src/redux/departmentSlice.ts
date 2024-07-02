import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Department {
  id: number;
  name: string;
}

interface DepartmentState {
  departments: Department[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  status: 'idle',
  error: null,
};

export const fetchDepartments = createAsyncThunk<Department[], void, { rejectValue: { message: string } }>(
  'department/fetchDepartments',
  async (_, thunkAPI) => {
    
    try {
      const response = await axios.get('https://mediplus.runasp.net/Department/GetAll', {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch departments' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const createDepartment = createAsyncThunk<Department, { name: string }, { rejectValue: { message: string } }>(
  'department/createDepartment',
  async (department, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.post('https://mediplus.runasp.net/Department/Create', department, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create department' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const updateDepartment = createAsyncThunk<Department, { id: number; name: string }, { rejectValue: { message: string } }>(
  'department/updateDepartment',
  async ({ id, name }, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.put(`https://mediplus.runasp.net/Department/Update/${id}`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to update department' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const deleteDepartment = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
  'department/deleteDepartment',
  async (departmentId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      await axios.delete(`https://mediplus.runasp.net/Department/DeleteDepartment/${departmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete department' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const fetchDepartmentById = createAsyncThunk<Department, number, { rejectValue: { message: string } }>(
  'department/fetchDepartmentById',
  async (departmentId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.get(`https://mediplus.runasp.net/Department/Get/${departmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch department details' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);
const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[]>) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch departments';
      })
      .addCase(createDepartment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        state.status = 'succeeded';
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create department';
      })
      .addCase(updateDepartment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        state.status = 'succeeded';
        const updatedIndex = state.departments.findIndex(dep => dep.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.departments[updatedIndex] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update department';
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.departments = state.departments.filter(dep => dep.id !== action.meta.arg);
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete department';
      })
      .addCase(fetchDepartmentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch department details';
      });
  },
});

export default departmentSlice.reducer;