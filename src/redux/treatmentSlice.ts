import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Treatment {
  id: number;
  title: string;
  icon: string;
  price: number;
  file: File | null;
}

interface TreatmentState {
  treatments: Treatment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TreatmentState = {
  treatments: [],
  status: 'idle',
  error: null,
};

const baseURL = 'https://mediplus.runasp.net/Treatment';

export const fetchTreatments = createAsyncThunk<Treatment[], void, { rejectValue: { message: string } }>(
  'treatment/fetchTreatments',
  async (_, thunkAPI) => {
    
    try {
      const response = await axios.get(`${baseURL}/GetAll`, {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch treatments' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const fetchTreatmentById = createAsyncThunk<Treatment, number, { rejectValue: { message: string } }>(
  'treatment/fetchTreatmentById',
  async (treatmentId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.get(`${baseURL}/Get/${treatmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch treatment details' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const createTreatment = createAsyncThunk<Treatment, FormData, { rejectValue: { message: string } }>(
  'treatment/createTreatment',
  async (formData, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.post(`${baseURL}/Create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create treatment' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const updateTreatment = createAsyncThunk<Treatment, FormData, { rejectValue: { message: string } }>(
  'treatment/updateTreatment',
  async (formData, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    const treatmentId = formData.get('id') as string;

    try {
      const response = await axios.put(`${baseURL}/Update/${treatmentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to update treatment' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const deleteTreatment = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
  'treatment/deleteTreatment',
  async (treatmentId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      await axios.delete(`${baseURL}/Delete/${treatmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete treatment' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const treatmentSlice = createSlice({
  name: 'treatment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTreatments.fulfilled, (state, action: PayloadAction<Treatment[]>) => {
        state.status = 'succeeded';
        state.treatments = action.payload;
      })
      .addCase(fetchTreatments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch treatments';
      })
      .addCase(fetchTreatmentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTreatmentById.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchTreatmentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch treatment details';
      })
      .addCase(createTreatment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTreatment.fulfilled, (state, action: PayloadAction<Treatment>) => {
        state.status = 'succeeded';
        state.treatments.push(action.payload);
      })
      .addCase(createTreatment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create treatment';
      })
      .addCase(updateTreatment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTreatment.fulfilled, (state, action: PayloadAction<Treatment>) => {
        state.status = 'succeeded';
        const updatedIndex = state.treatments.findIndex(treat => treat.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.treatments[updatedIndex] = action.payload;
        }
      })
      .addCase(updateTreatment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update treatment';
      })
      .addCase(deleteTreatment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTreatment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.treatments = state.treatments.filter(treat => treat.id !== action.meta.arg);
      })
      .addCase(deleteTreatment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete treatment';
      });
  },
});

export default treatmentSlice.reducer;