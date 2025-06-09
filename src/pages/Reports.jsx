import { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Select, Button, Table, Statistic } from 'antd';
import { DownloadOutlined, LineChartOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const { RangePicker } = DatePicker;

function Reports() {
  const dispatch = useAppDispatch();
  const { loans } = useAppSelector((state) => state.loans);
  const { farmers } = useAppSelector((state) => state.farmers);
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    // TODO: Fetch reports data based on date range
    console.log('Fetching reports data...');
  }, [dateRange]);

  const totalLoans = loans?.length || 0;
  const totalFarmers = farmers?.length || 0;
  const totalAmount = loans?.reduce((sum, loan) => sum + loan.amount, 0) || 0;
  const approvedLoans = loans?.filter(loan => loan.status === 'approved').length || 0;

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Farmer',
      dataIndex: ['farmer', 'name'],
      key: 'farmer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">View and analyze your loan data</p>
      </Card>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              placeholder="Select Report Type"
              style={{ width: '100%' }}
              defaultValue="loans"
            >
              <Select.Option value="loans">Loans</Select.Option>
              <Select.Option value="payments">Payments</Select.Option>
              <Select.Option value="farmers">Farmers</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ width: '100%', backgroundColor: '#10B981' }}
            >
              Export Report
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Summary Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Loans"
              value={totalLoans}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Amount"
              value={totalAmount}
              prefix="$"
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Loan Size"
              value={totalAmount / (totalLoans || 1)}
              prefix="$"
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Loan Distribution">
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PieChartOutlined style={{ fontSize: 48, color: '#10B981' }} />
              <span className="ml-4">Chart will be implemented here</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Monthly Trends">
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChartOutlined style={{ fontSize: 48, color: '#10B981' }} />
              <span className="ml-4">Chart will be implemented here</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Detailed Table */}
      <Card title="Detailed Report">
        <Table
          columns={columns}
          dataSource={loans}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}

export default Reports; 