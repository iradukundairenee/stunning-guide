import { useState } from 'react';
import { Table, Button, Space, Tag, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFarmers, addFarmer } from '../../store/slices/farmerSlice';
import AddFarmerForm from './AddFarmerForm';

function FarmersList() {
  const dispatch = useAppDispatch();
  const { farmers, loading, error } = useAppSelector((state) => state.farmers);
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (_: string, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Farm Size',
      dataIndex: 'farmSize',
      key: 'farmSize',
      render: (size: number) => `${size} acres`,
    },
    {
      title: 'Crops',
      dataIndex: 'crops',
      key: 'crops',
      render: (crops: string[]) => (
        <Space>
          {crops.map((crop) => (
            <Tag key={crop} color="green">
              {crop}
            </Tag>
          ))}
        </Space>
      ),
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

  const handleEdit = (farmer: any) => {
    // TODO: Implement edit functionality
    console.log('Edit farmer:', farmer);
  };

  const handleDelete = (farmer: any) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this farmer?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // TODO: Implement delete functionality
        console.log('Delete farmer:', farmer);
      },
    });
  };

  const handleAddSuccess = async (values: any) => {
    try {
      await dispatch(addFarmer(values)).unwrap();
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add farmer:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Farmers</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddModal(true)}
        >
          Add Farmer
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={farmers}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} farmers`,
        }}
      />

      <AddFarmerForm
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
        loading={loading}
      />
    </div>
  );
}

export default FarmersList; 