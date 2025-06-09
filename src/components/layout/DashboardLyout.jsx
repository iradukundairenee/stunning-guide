import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import SideNav from '../common/SideNav';
import Header from './Header';

const { Content } = Layout;

function DashboardLayout({ children }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Layout className="min-h-screen">
      <SideNav onLogout={handleLogout} />
      <Layout>
        <Header user={user} />
        <Content className="p-6 bg-gray-50">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout; 