import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Doctor {
    id: number;
    name: string;
    description: string;
    openingHours: string;
}

interface DoctorState {
    doctors: Doctor[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DoctorState = {
    doctors: [],
    status: 'idle',
    error: null,
};

// Fetch all doctors
export const fetchDoctors = createAsyncThunk<Doctor[], void, { rejectValue: { message: string } }>(
    'doctor/fetchDoctors',
    async (_, thunkAPI) => {
       
        try {
            const response = await axios.get('https://mediplus.runasp.net/Doctor/GetAll', {});
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch doctors' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Fetch doctor by id
export const fetchDoctorById = createAsyncThunk<Doctor, number, { rejectValue: { message: string } }>(
    'doctor/fetchDoctorById',
    async (doctorId, thunkAPI) => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        if (!token) {
            return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }

        try {
            const response = await axios.get(`https://mediplus.runasp.net/Doctor/Get/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch doctor details' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Create new doctor
export const createDoctor = createAsyncThunk<Doctor, Omit<Doctor, 'id'>, { rejectValue: { message: string } }>(
    'doctor/createDoctor',
    async (newDoctor, thunkAPI) => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        if (!token) {
            return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }

        try {
            const response = await axios.post('https://mediplus.runasp.net/Doctor/Create', newDoctor, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create doctor' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Update existing doctor
export const updateDoctor = createAsyncThunk<Doctor, Doctor, { rejectValue: { message: string } }>(
    'doctor/updateDoctor',
    async (updatedDoctor, thunkAPI) => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        if (!token) {
            return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }

        const { id, ...updatedFields } = updatedDoctor; // Destructure id and other fields

        try {
            const response = await axios.put(`https://mediplus.runasp.net/Doctor/Update/${id}`, updatedFields, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to update doctor' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Delete doctor by id
export const deleteDoctor = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
    'doctor/deleteDoctor',
    async (doctorId, thunkAPI) => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        if (!token) {
            return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }

        try {
            await axios.delete(`https://mediplus.runasp.net/Doctor/DeleteDoctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete doctor' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setDoctors(state, action: PayloadAction<Doctor[]>) {
            state.doctors = action.payload;
        },
        addDoctor(state, action: PayloadAction<Doctor>) {
            state.doctors.push(action.payload);
        },
        updateDoctor(state, action: PayloadAction<Partial<Doctor>>) {
            const { id, name, description, openingHours /* Add more fields if necessary */ } = action.payload;
            const existingDoctor = state.doctors.find((doctor) => doctor.id === id);
            if (existingDoctor) {
                existingDoctor.name = name || existingDoctor.name; // Update name if provided
                existingDoctor.description = description || existingDoctor.description; // Update description if provided
                existingDoctor.openingHours = openingHours || existingDoctor.openingHours; // Update openingHours if provided
                
            }
        },
        deleteDoctor(state, action: PayloadAction<number>) {
            state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
                state.status = 'succeeded';
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch doctors';
            })
            .addCase(createDoctor.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
                state.status = 'succeeded';
                state.doctors.push(action.payload);
            })
            .addCase(createDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to create doctor';
            })
            .addCase(updateDoctor.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
                state.status = 'succeeded';
                const updatedIndex = state.doctors.findIndex(doc => doc.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.doctors[updatedIndex] = action.payload;
                }
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to update doctor';
            })
            .addCase(deleteDoctor.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.doctors = state.doctors.filter(doc => doc.id !== action.meta.arg);
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to delete doctor';
            })
            .addCase(fetchDoctorById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctorById.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(fetchDoctorById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch doctor details';
            });
    },
});



export default doctorSlice.reducer;