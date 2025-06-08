import { useState } from 'react';
import { Card, Row, Col, Button, Space } from 'antd';
import { 
  UserOutlined, 
  CreditCardOutlined, 
  LineChartOutlined, 
  WarningOutlined,
  UserAddOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import StatCard from '../common/StatCard';
import ActivityItem from '../common/ActivityItem';
import AddFarmerForm from './AddFarmerForm';
import NewLoanForm from './NewLoanForm';

// Types for our data
interface DashboardStats {
  totalFarmers: number;
  activeLoans: number;
  totalTransactions: number;
  pendingApprovals: number;
}

interface RecentActivity {
  id: number;
  type: 'loan' | 'payment' | 'registration';
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

function AdminDashboardHome() {
  const [showAddFarmer, setShowAddFarmer] = useState(false);
  const [showNewLoan, setShowNewLoan] = useState(false);
  
  // Mock data - replace with actual API calls
  const [stats] = useState<DashboardStats>({
    totalFarmers: 1250,
    activeLoans: 450,
    totalTransactions: 2800,
    pendingApprovals: 15
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'loan',
      description: 'New loan application from John Doe',
      timestamp: '2024-03-20 14:30',
      status: 'pending'
    },
    {
      id: 2,
      type: 'payment',
      description: 'Payment received from Jane Smith',
      timestamp: '2024-03-20 13:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'registration',
      description: 'New farmer registration: Mike Johnson',
      timestamp: '2024-03-20 11:45',
      status: 'pending'
    }
  ]);

  const handleAddFarmerSuccess = (values: any) => {
    // TODO: Refresh farmer list or update stats
    console.log('Farmer added successfully:', values);
  };

  const handleNewLoanSuccess = (values: any) => {
    // TODO: Refresh loan list or update stats
    console.log('Loan created successfully:', values);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your system today.</p>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Farmers"
            value={stats.totalFarmers}
            icon={<UserOutlined />}
            trend={{ value: '+12%', isUp: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Active Loans"
            value={stats.activeLoans}
            icon={<CreditCardOutlined />}
            trend={{ value: '+5%', isUp: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions}
            icon={<LineChartOutlined />}
            trend={{ value: '+8%', isUp: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={<WarningOutlined />}
            trend={{ value: '-2%', isUp: false }}
          />
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              block
              onClick={() => setShowAddFarmer(true)}
            >
              Add Farmer
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              type="primary"
              icon={<CreditCardOutlined />}
              block
              onClick={() => setShowNewLoan(true)}
            >
              New Loan
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              type="primary"
              icon={<BarChartOutlined />}
              block
              onClick={() => {/* Handle view reports */}}
            >
              View Reports
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              block
              onClick={() => {/* Handle settings */}}
            >
              Settings
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Recent Activities */}
      <Card title="Recent Activities">
        <Space direction="vertical" style={{ width: '100%' }}>
          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              description={activity.description}
              timestamp={activity.timestamp}
              status={activity.status}
            />
          ))}
        </Space>
      </Card>

      {/* Add Farmer Modal */}
      <AddFarmerForm
        open={showAddFarmer}
        onClose={() => setShowAddFarmer(false)}
        onSuccess={handleAddFarmerSuccess}
      />

      {/* New Loan Modal */}
      <NewLoanForm
        open={showNewLoan}
        onClose={() => setShowNewLoan(false)}
        onSuccess={handleNewLoanSuccess}
      />
    </div>
  );
}

export default AdminDashboardHome;
