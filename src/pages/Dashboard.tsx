import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import DashboardLayout from '../components/layout/DashboardLyout';
import FarmerDashboardHome from '../components/Dashboard/FamerDashboardHome';
import AdminDashboardHome from '../components/Dashboard/AdminDashboardHome';
import FarmersList from '../components/Dashboard/FarmersList';
import LoansList from '../components/Dashboard/LoansList';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

// Define the user type
interface User {
  role: string;
  // Add other properties as needed
}

function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  // Component to show when a user is not authorized
  const NotAuthorized = () => (
    <div className="p-6 text-center text-red-500">
      You are not authorized to view this page.
    </div>
  );

  return (
    <DashboardLayout>
      <Routes>
        {/* Dashboard Home - Renders Admin or Farmer Home based on role */}
        <Route
          path="/"
          element={isAdmin ? <AdminDashboardHome /> : <FarmerDashboardHome />}
        />

        {/* Farmers List - Only render content if admin */}
        <Route
          path="/farmers"
          element={isAdmin ? <FarmersList /> : <NotAuthorized />}
        />

        {/* Loans List - Only render content if admin */}
        <Route
          path="/loans"
          element={isAdmin ? <LoansList /> : <NotAuthorized />}
        />

        {/* Reports - Only render content if admin */}
        <Route
          path="/reports"
          element={isAdmin ? <Reports /> : <NotAuthorized />}
        />

        {/* Settings - Visible to both */}        
        <Route path="/settings" element={<Settings />} />

        {/* Fallback for any other undefined routes within /dashboard */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </DashboardLayout>
  );
}

export default Dashboard;
