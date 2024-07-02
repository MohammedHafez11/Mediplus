import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Slider {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  file: File | null;
}

interface SliderState {
  sliders: Slider[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedSlider?: Slider;
}

const initialState: SliderState = {
  sliders: [],
  status: 'idle',
  error: null,
};

export const fetchSliders = createAsyncThunk<Slider[], void, { rejectValue: { message: string } }>(
    'slider/fetchSliders',
    async (_, thunkAPI) => {
      
  
      try {
        const response = await axios.get('https://mediplus.runasp.net/Slider/GetAll', {});
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue({ message: 'Failed to fetch sliders' });
      }
    }
  );

export const fetchSliderById = createAsyncThunk<Slider, number, { rejectValue: { message: string } }>(
  'slider/fetchSliderById',
  async (sliderId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.get(`https://mediplus.runasp.net/Slider/Get/${sliderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Failed to fetch slider details' });
    }
  }
);

export const createSlider = createAsyncThunk<Slider, FormData, { rejectValue: { message: string } }>(
  'slider/createSlider',
  async (formData, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.post('https://mediplus.runasp.net/Slider/Create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Failed to create slider' });
    }
  }
);

export const updateSlider = createAsyncThunk<Slider, FormData, { rejectValue: { message: string } }>(
  'slider/updateSlider',
  async (formData, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const sliderId = formData.get('id') as string;
      const response = await axios.put(`https://mediplus.runasp.net/Slider/Update/${sliderId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Failed to update slider' });
    }
  }
);

export const deleteSlider = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
  'slider/deleteSlider',
  async (sliderId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      await axios.delete(`https://mediplus.runasp.net/Slider/Delete/${sliderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Failed to delete slider' });
    }
  }
);

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action: PayloadAction<Slider[]>) => {
        state.status = 'succeeded';
        state.sliders = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch sliders';
      })
      .addCase(fetchSliderById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSliderById.fulfilled, (state, action: PayloadAction<Slider>) => {
        state.status = 'succeeded';
        state.selectedSlider = action.payload; // Update selectedSlider with fetched data
      })
      .addCase(fetchSliderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch slider details';
      })
      .addCase(createSlider.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createSlider.fulfilled, (state, action: PayloadAction<Slider>) => {
        state.status = 'succeeded';
        state.sliders.push(action.payload);
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create slider';
      })
      .addCase(updateSlider.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateSlider.fulfilled, (state, action: PayloadAction<Slider>) => {
        state.status = 'succeeded';
        const updatedIndex = state.sliders.findIndex(slider => slider.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.sliders[updatedIndex] = action.payload;
        }
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update slider';
      })
      .addCase(deleteSlider.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete slider';
      });
  },
});

export default sliderSlice.reducer;