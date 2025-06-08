import { useState } from 'react';

function FarmerDashboardHome() {
  // Mock data
  const [stats] = useState({
    creditScore: 720,
    pendingLoans: 1,
    upcomingHarvests: 2,
    recentSales: [
      { id: 1, date: '2023-05-15', amount: 250, crop: 'Corn' },
      { id: 2, date: '2023-05-10', amount: 180, crop: 'Wheat' },
      { id: 3, date: '2023-05-01', amount: 320, crop: 'Beans' }
    ]
  });

  // Get credit score color
  const getCreditScoreColor = (score: number) => {
    if (score >= 700) return 'bg-green-100 text-green-800';
    if (score >= 600) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Format date
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Credit Score</p>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getCreditScoreColor(stats.creditScore)}`}>
                  {stats.creditScore}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Pending Loan Applications</p>
              <div className="mt-1">
                <span className="text-xl font-semibold text-gray-900">{stats.pendingLoans}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Upcoming Harvests</p>
              <div className="mt-1">
                <span className="text-xl font-semibold text-gray-900">{stats.upcomingHarvests}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Sales</h3>
        </div>
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {stats.recentSales.map((sale) => (
              <li key={sale.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{sale.crop}</p>
                    <p className="text-sm text-gray-500">{formatDate(sale.date)}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">${sale.amount.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">
              View all sales <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <div className="p-6 text-center">
            <button className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Record Sale</h3>
            <p className="mt-1 text-sm text-gray-500">Add a new harvest sale</p>
          </div>
          
          <div className="p-6 text-center">
            <button className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <h3 className="mt-3 text-sm font-medium text-gray-900">View Credit Score</h3>
            <p className="mt-1 text-sm text-gray-500">Check your current score</p>
          </div>
          
          <div className="p-6 text-center">
            <button className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Apply for Loan</h3>
            <p className="mt-1 text-sm text-gray-500">Create new application</p>
          </div>
          
          <div className="p-6 text-center">
            <button className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Plan Harvest</h3>
            <p className="mt-1 text-sm text-gray-500">Schedule upcoming harvest</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboardHome;
