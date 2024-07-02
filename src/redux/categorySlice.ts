import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
  selectedCategory: null,
};


export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: { message: string } }>(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    

    try {
      const response = await axios.get('https://mediplus.runasp.net/Category/GetAll', {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch categories' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const createCategory = createAsyncThunk<Category, { name: string }, { rejectValue: { message: string } }>(
  'category/createCategory',
  async (category, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.post('https://mediplus.runasp.net/Category/Create', category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create category' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const updateCategory = createAsyncThunk<Category, { id: number; name: string }, { rejectValue: { message: string } }>(
  'category/updateCategory',
  async ({ id, name }, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const response = await axios.put(`https://mediplus.runasp.net/Category/Update/${id}`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to update category' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const deleteCategory = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
  'category/deleteCategory',
  async (categoryId, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      await axios.delete(`https://mediplus.runasp.net/Category/DeleteCategory/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete category' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

export const fetchCategoryById = createAsyncThunk<Category | undefined, number, { rejectValue: { message: string } }>(
    'category/fetchCategoryById',
    async (categoryId, thunkAPI) => {
      try {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;
        if (!token) {
          return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }
  
        const response = await axios.get(`https://mediplus.runasp.net/Category/Get/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Assuming response.data is of type Category
        return response.data as Category;
      } catch (error) {
        // Handle Axios errors
        if (axios.isAxiosError(error)) {
          return thunkAPI.rejectWithValue({
            message: error.response?.data.message || 'Failed to fetch category details',
          });
        } else {
          return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
        }
      }
    }
  );
  

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch categories';
      })
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create category';
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.status = 'succeeded';
        const updatedIndex = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.categories[updatedIndex] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update category';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.filter(cat => cat.id !== action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete category';
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category | undefined>) => {
        state.status = 'succeeded';
        state.selectedCategory = action.payload ?? null; // Handle undefined case
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch category details';
      });
  },
});

export default categorySlice.reducer;