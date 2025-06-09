import { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFarmers } from '../../store/slices/farmerSlice';

function FarmersList() {
  const dispatch = useAppDispatch();
  const { farmers, loading } = useAppSelector((state) => state.farmers);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);

  const handleView = (farmer) => {
    setSelectedFarmer(farmer);
    setIsModalVisible(true);
  };

  const handleEdit = (farmer) => {
    // TODO: Implement edit functionality
    console.log('Edit farmer:', farmer);
  };

  const handleDelete = (farmer) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this farmer?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // TODO: Implement delete functionality
        console.log('Delete farmer:', farmer);
        message.success('Farmer deleted successfully');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
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
        <h2 className="text-2xl font-semibold">Farmers List</h2>
        <Button type="primary">
          Add New Farmer
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

      <Modal
        title="Farmer Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedFarmer && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{selectedFarmer.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{selectedFarmer.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{selectedFarmer.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <Tag color={selectedFarmer.status === 'active' ? 'green' : 'red'}>
                {selectedFarmer.status.toUpperCase()}
              </Tag>
            </div>
            <div>
              <h3 className="font-semibold">Farm Details</h3>
              <p>{selectedFarmer.farmDetails || 'No farm details available'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FarmersList; 