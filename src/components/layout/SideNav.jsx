import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const { Sider } = Layout;

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    ...(isAdmin ? [
      {
        key: '/farmers',
        icon: <TeamOutlined />,
        label: 'Farmers',
      },
      {
        key: '/loans',
        icon: <FileTextOutlined />,
        label: 'Loans',
      },
      {
        key: '/reports',
        icon: <BarChartOutlined />,
        label: 'Reports',
      },
    ] : [
      {
        key: '/profile',
        icon: <UserOutlined />,
        label: 'Profile',
      },
      {
        key: '/my-loans',
        icon: <FileTextOutlined />,
        label: 'My Loans',
      },
    ]),
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Sider
      width={250}
      className="bg-white border-r border-gray-200"
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <div className="p-4">
        <h1 className="text-xl font-bold text-green-600">TechCrop</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="border-r-0"
      />
    </Sider>
  );
}

export default SideNav; 