import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Garden {
  id: string;
  farmerId: string;
  name: string;
  size: number;
  soilType: string;
  irrigationType: string;
  crops: string[];
  expectedHarvestDate: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface GardenState {
  gardens: Garden[];
  loading: boolean;
  error: string | null;
}

const initialState: GardenState = {
  gardens: [],
  loading: false,
  error: null,
};

export const fetchGardens = createAsyncThunk(
  'gardens/fetchGardens',
  async () => {
    const response = await axios.get('/api/gardens');
    return response.data;
  }
);

export const addGarden = createAsyncThunk(
  'gardens/addGarden',
  async (garden: Omit<Garden, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post('/api/gardens', garden);
    return response.data;
  }
);

export const updateGarden = createAsyncThunk(
  'gardens/updateGarden',
  async (garden: Garden) => {
    const response = await axios.put(`/api/gardens/${garden.id}`, garden);
    return response.data;
  }
);

export const deleteGarden = createAsyncThunk(
  'gardens/deleteGarden',
  async (id: string) => {
    await axios.delete(`/api/gardens/${id}`);
    return id;
  }
);

const gardenSlice = createSlice({
  name: 'gardens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch gardens
      .addCase(fetchGardens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGardens.fulfilled, (state, action) => {
        state.loading = false;
        state.gardens = action.payload;
      })
      .addCase(fetchGardens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch gardens';
      })
      // Add garden
      .addCase(addGarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.gardens.push(action.payload);
      })
      .addCase(addGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add garden';
      })
      // Update garden
      .addCase(updateGarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGarden.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.gardens.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.gardens[index] = action.payload;
        }
      })
      .addCase(updateGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update garden';
      })
      // Delete garden
      .addCase(deleteGarden.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.gardens = state.gardens.filter((g) => g.id !== action.payload);
      })
      .addCase(deleteGarden.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete garden';
      });
  },
});

export default gardenSlice.reducer; 