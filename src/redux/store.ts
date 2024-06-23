import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import departmentReducer from './departmentSlice';
import projectReducer from './projectSlice';
import sliderReducer from './sliderSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    project: projectReducer,
    slider: sliderReducer,
    
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;