import { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchLoans } from '../../store/slices/loanSlice';

function LoansList() {
  const dispatch = useAppDispatch();
  const { loans, loading } = useAppSelector((state) => state.loans);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const handleView = (loan) => {
    setSelectedLoan(loan);
    setIsModalVisible(true);
  };

  const handleEdit = (loan) => {
    // TODO: Implement edit functionality
    console.log('Edit loan:', loan);
  };

  const handleDelete = (loan) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this loan?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // TODO: Implement delete functionality
        console.log('Delete loan:', loan);
        message.success('Loan deleted successfully');
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'orange';
      case 'rejected':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Farmer Name',
      dataIndex: ['farmer', 'name'],
      key: 'farmerName',
      sorter: (a, b) => a.farmer.name.localeCompare(b.farmer.name),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toLocaleString()}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Loans List</h2>
        <Button type="primary">
          Add New Loan
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={loans}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} loans`,
        }}
      />

      <Modal
        title="Loan Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedLoan && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Farmer Name</h3>
              <p>{selectedLoan.farmer.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Amount</h3>
              <p>${selectedLoan.amount.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <Tag color={getStatusColor(selectedLoan.status)}>
                {selectedLoan.status.toUpperCase()}
              </Tag>
            </div>
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{new Date(selectedLoan.date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{selectedLoan.description || 'No description available'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default LoansList; 