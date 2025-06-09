import { Layout, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

const { Header: AntHeader } = Layout;

function Header({ user }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/dashboard/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="bg-white px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'Farmer Dashboard'}
        </h1>
      </div>

      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        arrow
      >
        <Space className="cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <span className="text-gray-700">{user?.name || 'User'}</span>
        </Space>
      </Dropdown>
    </AntHeader>
  );
}

export default Header; 