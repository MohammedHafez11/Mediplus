import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import departmentReducer from './departmentSlice';
import projectReducer from './projectSlice';
import sliderReducer from './sliderSlice';
import treatmentReducer from './treatmentSlice';
import categoryReducer from './categorySlice';
import doctorReducer from './doctorSlice';
import reservationReducer from './reservationSlice'
import blogReducer from './blogSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    project: projectReducer,
    slider: sliderReducer,
    treatment: treatmentReducer,
    category: categoryReducer,
    doctor: doctorReducer,
    reservation: reservationReducer,
    blog: blogReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;