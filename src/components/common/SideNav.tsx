import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  CreditCardOutlined,
  SettingOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import type { AuthState } from '../../store/slices/authSlice';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  roles?: string[];
}

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector(state => (state.auth as AuthState));
  const userRole = user?.role;

  const allMenuItems: MenuItem[] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      roles: ['admin', 'farmer'],
    },
    {
      key: '/dashboard/farmers',
      icon: <UserOutlined />,
      label: 'Farmers',
      roles: ['admin'],
    },
    {
      key: '/dashboard/loans',
      icon: <CreditCardOutlined />,
      label: 'Loans',
      roles: ['admin'],
    },
    {
      key: '/dashboard/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
      roles: ['admin'],
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      roles: ['admin', 'farmer'],
    },
  ];

  const menuItems = allMenuItems.filter(item => 
    !item.roles || (userRole && item.roles.includes(userRole))
  );

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <Sider
      width={250}
      className="bg-white border-r border-gray-200"
    >
      <div className="p-4">
        <h1 className="text-xl font-bold text-green-600">TechCrop</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
        className="border-r-0"
      />
    </Sider>
  );
}

export default SideNav; 
