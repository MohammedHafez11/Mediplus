import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  departmentId: number;
  doctorId: number;
  description: string;
  date: string;
}

interface ReservationState {
  reservations: Reservation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  status: 'idle',
  error: null,
};

// Fetch all reservations
export const fetchReservations = createAsyncThunk<Reservation[], void, { rejectValue: { message: string } }>(
  'reservation/fetchReservations',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.get('https://mediplus.runasp.net/Reservation/GetAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch reservations' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Delete reservation by id
export const deleteReservation = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
  'reservation/deleteReservation',
  async (reservationId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      await axios.delete(`https://mediplus.runasp.net/Reservation/DeleteReservation/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete reservation' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Create a reservation
export const createReservation = createAsyncThunk<Reservation, Omit<Reservation, 'id'>, { rejectValue: { message: string } }>(
  'reservation/createReservation',
  async (newReservation, thunkAPI) => {
    
    try {
      const response = await axios.post('https://mediplus.runasp.net/Reservation/Create', newReservation, {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create reservation' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetReservationStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch reservations';
      })
      .addCase(deleteReservation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = state.reservations.filter((res) => res.id !== action.meta.arg);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete reservation';
      })
      .addCase(createReservation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
        state.status = 'succeeded';
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create reservation';
      });
  },
});

export const { resetReservationStatus } = reservationSlice.actions; // export the reset action
export default reservationSlice.reducer;