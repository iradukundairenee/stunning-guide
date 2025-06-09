import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for testing
const mockFarmers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'active',
    farmDetails: 'Organic farm with 50 acres of land',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    status: 'active',
    farmDetails: 'Dairy farm with 100 cows',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1122334455',
    status: 'inactive',
    farmDetails: 'Vegetable farm with 30 acres',
  },
];

// Async thunk for fetching farmers
export const fetchFarmers = createAsyncThunk(
  'farmers/fetchFarmers',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockFarmers;
  }
);

const farmerSlice = createSlice({
  name: 'farmers',
  initialState: {
    farmers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarmers.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = action.payload;
      })
      .addCase(fetchFarmers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default farmerSlice.reducer; 