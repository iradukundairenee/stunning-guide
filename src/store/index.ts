import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import farmerReducer from './slices/farmerSlice';
import loanReducer from './slices/loanSlice';

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  farmers: ReturnType<typeof farmerReducer>;
  loans: ReturnType<typeof loanReducer>;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    farmers: farmerReducer,
    loans: loanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch; 