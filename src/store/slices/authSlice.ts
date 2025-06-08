import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'farmer';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Mock users for development
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'farmer@example.com',
    password: 'farmer123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'farmer' as const,
  },
];

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { email, password } = credentials;

    // Find a matching user by email and password
    const matchedUser = mockUsers.find(
      user => user.email === email && user.password === password
    );

    if (matchedUser) {
      const { password: _, ...userWithoutPassword } = matchedUser;
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem('token', token);
      return { token, user: userWithoutPassword };
    }

    throw new Error('Invalid credentials');
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
    return null;
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    if (!auth.token) throw new Error('No token found');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, you'd fetch the user based on the token
    // For this mock, we can try to find the user in our mock list based on email in state (if available)
    if (auth.user) {
      const currentUser = mockUsers.find(user => user.email === auth.user?.email);
      if (currentUser) {
        const { password: _, ...userWithoutPassword } = currentUser;
        return userWithoutPassword;
      }
    }

    throw new Error('Failed to get user data'); // Or handle token expiration
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get user data';
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 