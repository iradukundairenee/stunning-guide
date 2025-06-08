import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Farmer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  farmSize: number;
  crops: string[];
  address: string;
}

interface FarmerState {
  farmers: Farmer[];
  loading: boolean;
  error: string | null;
}

const initialState: FarmerState = {
  farmers: [],
  loading: false,
  error: null,
};

export const fetchFarmers = createAsyncThunk(
  'farmers/fetchFarmers',
  async () => {
    const response = await axios.get('/api/farmers');
    return response.data;
  }
);

export const addFarmer = createAsyncThunk(
  'farmers/addFarmer',
  async (farmerData: Omit<Farmer, 'id'>) => {
    const response = await axios.post('/api/farmers', farmerData);
    return response.data;
  }
);

export const updateFarmer = createAsyncThunk(
  'farmers/updateFarmer',
  async ({ id, data }: { id: string; data: Partial<Farmer> }) => {
    const response = await axios.put(`/api/farmers/${id}`, data);
    return response.data;
  }
);

export const deleteFarmer = createAsyncThunk(
  'farmers/deleteFarmer',
  async (id: string) => {
    await axios.delete(`/api/farmers/${id}`);
    return id;
  }
);

const farmerSlice = createSlice({
  name: 'farmers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch farmers
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
        state.error = action.error.message || 'Failed to fetch farmers';
      })
      // Add farmer
      .addCase(addFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers.push(action.payload);
      })
      .addCase(addFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add farmer';
      })
      // Update farmer
      .addCase(updateFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFarmer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.farmers.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.farmers[index] = action.payload;
        }
      })
      .addCase(updateFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update farmer';
      })
      // Delete farmer
      .addCase(deleteFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = state.farmers.filter((f) => f.id !== action.payload);
      })
      .addCase(deleteFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete farmer';
      });
  },
});

export default farmerSlice.reducer; 