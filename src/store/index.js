import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import farmerReducer from './slices/farmerSlice';
import loanReducer from './slices/loanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    farmers: farmerReducer,
    loans: loanReducer,
  },
});

export default store; 