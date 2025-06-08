import { Card, Row, Col, DatePicker, Select, Button, Table, Statistic } from 'antd';
import { DownloadOutlined, LineChartOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;

interface ReportData {
  key: string;
  farmer: string;
  loanAmount: number;
  status: string;
  date: string;
  interest: number;
}

function Reports() {
  // Mock data for the table
  const data: ReportData[] = [
    {
      key: '1',
      farmer: 'John Doe',
      loanAmount: 5000,
      status: 'Active',
      date: '2024-03-20',
      interest: 500
    },
    {
      key: '2',
      farmer: 'Jane Smith',
      loanAmount: 3000,
      status: 'Paid',
      date: '2024-03-19',
      interest: 300
    },
    // Add more mock data as needed
  ];

  const columns: ColumnsType<ReportData> = [
    {
      title: 'Farmer',
      dataIndex: 'farmer',
      key: 'farmer',
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      render: (value) => `$${value.toLocaleString()}`,
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
              value={150}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Amount"
              value={750000}
              prefix="$"
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Loan Size"
              value={5000}
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
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}

export default Reports; 