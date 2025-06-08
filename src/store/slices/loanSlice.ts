import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Loan {
  id: string;
  farmerId: string;
  farmerName: string;
  amount: number;
  interestRate: number;
  term: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string;
  updatedAt: string;
}

interface LoanState {
  loans: Loan[];
  loading: boolean;
  error: string | null;
}

const initialState: LoanState = {
  loans: [],
  loading: false,
  error: null,
};

export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async () => {
    const response = await axios.get('/api/loans');
    return response.data;
  }
);

export const addLoan = createAsyncThunk(
  'loans/addLoan',
  async (loanData: Omit<Loan, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post('/api/loans', loanData);
    return response.data;
  }
);

export const updateLoan = createAsyncThunk(
  'loans/updateLoan',
  async ({ id, data }: { id: string; data: Partial<Loan> }) => {
    const response = await axios.put(`/api/loans/${id}`, data);
    return response.data;
  }
);

export const deleteLoan = createAsyncThunk(
  'loans/deleteLoan',
  async (id: string) => {
    await axios.delete(`/api/loans/${id}`);
    return id;
  }
);

const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch loans
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
        state.error = action.error.message || 'Failed to fetch loans';
      })
      // Add loan
      .addCase(addLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.push(action.payload);
      })
      .addCase(addLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add loan';
      })
      // Update loan
      .addCase(updateLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.loans.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.loans[index] = action.payload;
        }
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update loan';
      })
      // Delete loan
      .addCase(deleteLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = state.loans.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete loan';
      });
  },
});

export default loanSlice.reducer; 