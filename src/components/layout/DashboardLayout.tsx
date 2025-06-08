import { Layout } from 'antd';
import SideNav from './SideNav';
import Header from './Header';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';

const { Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav />
      <Layout>
        <Header user={user} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout; 