import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for testing
const mockLoans = [
  {
    id: 1,
    farmer: {
      id: 1,
      name: 'John Doe',
    },
    amount: 50000,
    status: 'approved',
    date: '2024-03-15',
    description: 'Loan for purchasing new equipment',
  },
  {
    id: 2,
    farmer: {
      id: 2,
      name: 'Jane Smith',
    },
    amount: 75000,
    status: 'pending',
    date: '2024-03-20',
    description: 'Loan for expanding dairy operations',
  },
  {
    id: 3,
    farmer: {
      id: 3,
      name: 'Bob Wilson',
    },
    amount: 30000,
    status: 'rejected',
    date: '2024-03-10',
    description: 'Loan for seasonal crop planting',
  },
];

// Async thunk for fetching loans
export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockLoans;
  }
);

const loanSlice = createSlice({
  name: 'loans',
  initialState: {
    loans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loanSlice.reducer; 