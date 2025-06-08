import { useState } from 'react';
import { Table, Button, Space, Tag, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchLoans, addLoan } from '../../store/slices/loanSlice';
import AddLoanForm from './AddLoanForm';

function LoansList() {
  const dispatch = useAppDispatch();
  const { loans, loading, error } = useAppSelector((state) => state.loans);
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    {
      title: 'Farmer',
      dataIndex: 'farmerName',
      key: 'farmerName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Interest Rate',
      dataIndex: 'interestRate',
      key: 'interestRate',
      render: (rate: number) => `${rate}%`,
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
      render: (term: number) => `${term} months`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pending: 'orange',
          approved: 'green',
          rejected: 'red',
          paid: 'blue',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="text"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            type="text"
            danger
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (loan: any) => {
    // TODO: Implement edit functionality
    console.log('Edit loan:', loan);
  };

  const handleDelete = (loan: any) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this loan?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // TODO: Implement delete functionality
        console.log('Delete loan:', loan);
      },
    });
  };

  const handleAddSuccess = async (values: any) => {
    try {
      await dispatch(addLoan(values)).unwrap();
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add loan:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Loans</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddModal(true)}
        >
          Add Loan
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

      <AddLoanForm
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
        loading={loading}
      />
    </div>
  );
}

export default LoansList; 