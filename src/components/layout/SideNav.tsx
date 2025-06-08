import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

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
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/dashboard/farmer-registration',
      icon: <TeamOutlined />,
      label: 'Farmer Registration',
    },
    {
      key: '/dashboard/loans',
      icon: <FileTextOutlined />,
      label: 'Loans',
    },
    {
      key: '/dashboard/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
    />
  );
}

export default SideNav; 