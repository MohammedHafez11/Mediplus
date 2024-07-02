import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the blog interface
export interface Blog {
    id: number;
    title: string;
    content: string;
    facebookUrl: string;
    linkedinUrl: string;
    categoryId: number;
    date?: string;
    files?: File[];
    imageUrls?: string[];
    commentsCount: number;
    comments: any[];
}

// Define the blog state interface
interface BlogState {
    selectedBlog: Blog | null;
    blogs: Blog[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: BlogState = {
    selectedBlog: null,
    blogs: [],
    status: 'idle',
    error: null,
};

// Fetch all blogs
export const fetchBlogs = createAsyncThunk<Blog[], void, { rejectValue: { message: string } }>(
    'blog/fetchBlogs',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://mediplus.runasp.net/Blog/GetAll');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch blogs' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Fetch blog by id
export const fetchBlogById = createAsyncThunk<Blog, number, { rejectValue: { message: string } }>(
    'blog/fetchBlogById',
    async (blogId, thunkAPI) => {
        try {
            const response = await axios.get(`https://mediplus.runasp.net/Blog/Get/${blogId}`,{});
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch blog details' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Create new blog
export const createBlog = createAsyncThunk<
  Blog,
  Partial<Blog>,
  { rejectValue: { message: string } }
>(
  'blog/createBlog',
  async (newBlog, thunkAPI) => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

    if (!token) {
      return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
    }

    try {
      const formData = new FormData();
      formData.append('title', newBlog.title || '');
      formData.append('content', newBlog.content || '');
      formData.append('facebookUrl', newBlog.facebookUrl || '');
      formData.append('linkedinUrl', newBlog.linkedinUrl || '');
      formData.append('categoryId', String(newBlog.categoryId));
      if (newBlog.files) {
        newBlog.files.forEach((file) => formData.append('files', file));
      }

      const response = await axios.post('https://mediplus.runasp.net/Blog/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create blog' });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Update existing blog
export const updateBlog = createAsyncThunk<Blog, Partial<Blog>, { rejectValue: { message: string } }>(
    'blog/updateBlog',
    async (updatedBlog, thunkAPI) => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        if (!token) {
            return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }

        try {
            const formData = new FormData();
            formData.append('title', updatedBlog.title || '');
            formData.append('content', updatedBlog.content || '');
            formData.append('facebookUrl', updatedBlog.facebookUrl || '');
            formData.append('linkedinUrl', updatedBlog.linkedinUrl || '');
            formData.append('categoryId', String(updatedBlog.categoryId));
            if (updatedBlog.files) {
                updatedBlog.files.forEach((file) => formData.append('files', file));
            }

            const response = await axios.put(`https://mediplus.runasp.net/Blog/Update/${updatedBlog.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Return updated blog data from API
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to update blog' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Delete blog by id
export const deleteBlog = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
    'blog/deleteBlog',
    async (blogId, thunkAPI) => {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;

        if (!token) {
            return thunkAPI.rejectWithValue({ message: 'No authentication token found' });
        }
        try {
            await axios.delete(`https://mediplus.runasp.net/Blog/DeleteBlog/${blogId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete blog' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Fetch recent blogs
export const fetchRecentBlogs = createAsyncThunk<Blog[], void, { rejectValue: { message: string } }>(
    'blog/fetchRecentBlogs',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://mediplus.runasp.net/Blog/GetRecent');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch recent blogs' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Fetch blogs by category ID
export const fetchBlogsByCategoryId = createAsyncThunk<Blog[], number, { rejectValue: { message: string } }>(
    'blog/fetchBlogsByCategoryId',
    async (categoryId, thunkAPI) => {
        try {
            const response = await axios.get(`https://mediplus.runasp.net/Blog/GetByCategoryId/${categoryId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch blogs by category ID' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Search blogs
export const searchBlogs = createAsyncThunk<Blog[], string, { rejectValue: { message: string } }>(
    'blog/searchBlogs',
    async (query, thunkAPI) => {
        try {
            const response = await axios.get(`https://mediplus.runasp.net/Blog/Search/${query}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to search blogs' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Create the blog slice
const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs(state, action: PayloadAction<Blog[]>) {
            state.blogs = action.payload;
        },
        addBlog(state, action: PayloadAction<Blog>) {
            state.blogs.push(action.payload);
        },
        updateBlog(state, action: PayloadAction<Partial<Blog>>) {
            const { id, title, content, facebookUrl, linkedinUrl, categoryId, files } = action.payload;
            const existingBlog = state.blogs.find((blog) => blog.id === id);
            if (existingBlog) {
                if (title) existingBlog.title = title;
                if (content) existingBlog.content = content;
                if (facebookUrl) existingBlog.facebookUrl = facebookUrl;
                if (linkedinUrl) existingBlog.linkedinUrl = linkedinUrl;
                if (categoryId) existingBlog.categoryId = categoryId;
                if (files) existingBlog.files = files;
            }
        },
        deleteBlog(state, action: PayloadAction<number>) {
            state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch blogs';
            })
            .addCase(fetchBlogById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
                state.status = 'succeeded';
                const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                } else {
                    state.blogs.push(action.payload);
                }
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch blog details';
            })
            .addCase(createBlog.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
                state.status = 'succeeded';
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to create blog';
            })
            .addCase(updateBlog.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
                state.status = 'succeeded';
                const updatedIndex = state.blogs.findIndex(blog => blog.id === action.payload.id);
                if (updatedIndex !== -1) {
                    // Preserve existing image URLs if not updated
                    const existingImageUrls = state.blogs[updatedIndex].imageUrls;
                    state.blogs[updatedIndex] = {
                        ...state.blogs[updatedIndex],
                        ...action.payload,
                        imageUrls: action.payload.imageUrls ?? existingImageUrls, // Use new URLs or keep existing ones
                    };
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to update blog';
            })
            .addCase(deleteBlog.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = state.blogs.filter(blog => blog.id !== action.meta.arg);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to delete blog';
            })
            .addCase(fetchRecentBlogs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRecentBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchRecentBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch recent blogs';
            })
            .addCase(fetchBlogsByCategoryId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBlogsByCategoryId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(fetchBlogsByCategoryId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch blogs by category ID';
            })
            .addCase(searchBlogs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(searchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
                state.status = 'succeeded';
                state.blogs = action.payload;
            })
            .addCase(searchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to search blogs';
            });
    },
});



export default blogSlice.reducer;