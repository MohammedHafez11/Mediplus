import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  userId: string | null;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface LoginResponse {
  userId: string;
  email: string;
  name: string;
  imageUrl: string;
  token: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userId: null,
  email: null,
  name: null,
  imageUrl: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<LoginResponse>('https://mediplus.runasp.net/Users/Login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.isAuthenticated) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue({ message: 'Invalid email or password' });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const resetAuthState = () => ({
  type: 'auth/resetAuthState',
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add the resetAuthState reducer to handle resetting the authentication state
    resetAuthState(state) {
      state.userId = null;
      state.email = null;
      state.name = null;
      state.imageUrl = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.imageUrl = action.payload.imageUrl;
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.isAuthenticated;
        localStorage.setItem('auth', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to login';
      });
  },
});

export default authSlice.reducer;