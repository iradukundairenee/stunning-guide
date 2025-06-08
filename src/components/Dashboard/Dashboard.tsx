import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFarmers } from '../../store/slices/farmerSlice';
import { fetchLoans } from '../../store/slices/loanSlice';
import FarmersList from './FarmersList';
import LoansList from './LoansList';

function Dashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(fetchFarmers());
      dispatch(fetchLoans());
    } else if (user?.role === 'farmer') {
      // TODO: Fetch farmer-specific data
      console.log('Fetching farmer data...');
    }
  }, [dispatch, user?.role]);

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user.firstName}!
        </h1>
        <p className="mt-1 text-gray-600">
          {user.role === 'admin'
            ? "Here's an overview of your farmers and their activities."
            : "Here's an overview of your farm and loan status."}
        </p>
      </div>

      {user.role === 'admin' ? (
        <div className="space-y-8">
          <FarmersList />
          <LoansList />
        </div>
      ) : (
        <div className="space-y-8">
          {/* TODO: Add farmer-specific dashboard components */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Farm Overview</h2>
            <p>Farm details and statistics will be displayed here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Loans</h2>
            <p>Your loan applications and status will be displayed here.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 