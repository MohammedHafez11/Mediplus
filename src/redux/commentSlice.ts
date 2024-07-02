import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the comment interface
interface Comment {
    id: number;
    details: string;
    firstName: string;
    lastName: string;
    email: string;
    date: string;
    blogId: number;
}

// Define the comment state interface
interface CommentState {
    comments: Comment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: CommentState = {
    comments: [],
    status: 'idle',
    error: null,
};

// Fetch all comments
export const fetchComments = createAsyncThunk<Comment[], void, { rejectValue: { message: string } }>(
    'comment/fetchComments',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://mediplus.runasp.net/Comment/GetAll');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch comments' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Fetch comment by id
export const fetchCommentById = createAsyncThunk<Comment, number, { rejectValue: { message: string } }>(
    'comment/fetchCommentById',
    async (commentId, thunkAPI) => {
        try {
            const response = await axios.get(`https://mediplus.runasp.net/Comment/Get/${commentId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to fetch comment details' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Create new comment
export const createComment = createAsyncThunk<
    Comment,
    Omit<Comment, 'id'>,
    { rejectValue: { message: string } }
>(
    'comment/createComment',
    async (newComment, thunkAPI) => {
        try {
            const response = await axios.post('https://mediplus.runasp.net/Comment/Create', newComment, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to create comment' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Delete comment by id
export const deleteComment = createAsyncThunk<void, number, { rejectValue: { message: string } }>(
    'comment/deleteComment',
    async (commentId, thunkAPI) => {
        try {
            await axios.delete(`https://mediplus.runasp.net/Comment/DeleteComment/${commentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to delete comment' });
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
            }
        }
    }
);

// Create the comment slice
const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments(state, action: PayloadAction<Comment[]>) {
            state.comments = action.payload;
        },
        addComment(state, action: PayloadAction<Comment>) {
            state.comments.push(action.payload);
        },
        updateComment(state, action: PayloadAction<Partial<Comment>>) {
            const { id, details, firstName, lastName, email, date, blogId } = action.payload;
            const existingComment = state.comments.find((comment) => comment.id === id);
            if (existingComment) {
                if (details) existingComment.details = details;
                if (firstName) existingComment.firstName = firstName;
                if (lastName) existingComment.lastName = lastName;
                if (email) existingComment.email = email;
                if (date) existingComment.date = date;
                if (blogId) existingComment.blogId = blogId;
            }
        },
        deleteComment(state, action: PayloadAction<number>) {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch comments';
            })
            .addCase(fetchCommentById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCommentById.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.status = 'succeeded';
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                } else {
                    state.comments.push(action.payload);
                }
            })
            .addCase(fetchCommentById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch comment details';
            })
            .addCase(createComment.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.status = 'succeeded';
                state.comments.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to create comment';
            })
            .addCase(deleteComment.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = state.comments.filter(comment => comment.id !== action.meta.arg);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to delete comment';
            });
    },
});



export default commentSlice.reducer;