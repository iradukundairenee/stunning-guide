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

function FarmerDashboardHome() {
  const [stats] = useState({
    creditScore: 750,
    pendingLoans: 2,
    upcomingHarvests: 3
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'loan',
      description: 'Loan application submitted',
      timestamp: '2024-03-20 14:30',
      status: 'pending'
    },
    {
      id: 2,
      type: 'payment',
      description: 'Payment received',
      timestamp: '2024-03-20 13:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'harvest',
      description: 'Upcoming harvest scheduled',
      timestamp: '2024-03-20 11:45',
      status: 'pending'
    }
  ]);

  const getCreditScoreColor = (score) => {
    if (score >= 750) return 'bg-green-100 text-green-800';
    if (score >= 650) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Farmer</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your farm and loan status.</p>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Credit Score"
            value={stats.creditScore}
            icon={<LineChartOutlined />}
            trend={{ value: '+25', isUp: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Pending Loans"
            value={stats.pendingLoans}
            icon={<CreditCardOutlined />}
            trend={{ value: '2 new', isUp: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <StatCard
            title="Upcoming Harvests"
            value={stats.upcomingHarvests}
            icon={<BarChartOutlined />}
            trend={{ value: 'Next: 15 days', isUp: true }}
          />
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Button
              type="primary"
              icon={<CreditCardOutlined />}
              block
              onClick={() => {/* Handle new loan */}}
            >
              Apply for Loan
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
              icon={<UserOutlined />}
              block
              onClick={() => {/* Handle profile */}}
            >
              Update Profile
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
    </div>
  );
}

export default FarmerDashboardHome; 