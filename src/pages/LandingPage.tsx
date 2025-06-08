import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import LandingPageHeader from '../components/layout/LandingPageHeader';
import Footer from '../components/layout/Footer';
import { Button, Collapse, Typography, Card, Row, Col, Space, Divider } from 'antd';
import { CaretRightOutlined, MobileOutlined, GlobalOutlined, CheckCircleOutlined } from '@ant-design/icons';
import heroImage from '../assets/images/faming2.jpg';

const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

function LandingPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LandingPageHeader onSignInClick={showModal} />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
        <img
          src={heroImage}
          alt="Farming Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto">
          <Paragraph className="text-xl mb-8 text-gray-200">
            Empowering Farmers with Digital Financial Solutions
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" onClick={showModal}>
              Get Started
            </Button>
            <Button size="large" ghost onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </Space>
        </div>
      </div>

      {/* Access Methods Section */}
      <section id="access-section" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <Title level={2} className="text-center mb-12">Access TechCrop</Title>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={12} lg={10}>
              <Card hoverable className="h-full">
                <Space direction="vertical" size="large" className="w-full">
                  <MobileOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <Title level={3} className="mb-0">USSD Interface</Title>
                  <Paragraph className="text-gray-600">
                    Access basic features on any phone, even without internet.
                  </Paragraph>
                  <Text strong className="text-lg">Dial: *354#</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={10}>
              <Card hoverable className="h-full">
                <Space direction="vertical" size="large" className="w-full">
                  <GlobalOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <Title level={3} className="mb-0">Web Portal</Title>
                  <Paragraph className="text-gray-600">
                    A feature-rich platform for farmers and administrators with internet access.
                  </Paragraph>
                  <Button type="primary" onClick={showModal}>
                    Access Web Portal
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Title level={2} className="text-center mb-12">How It Works</Title>
          <Card className="shadow-lg">
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="bg-white"
            >
              <Panel 
                header={
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text strong>Registration & Profile Setup</Text>
                  </Space>
                } 
                key="1"
              >
                <Paragraph className="text-gray-600">
                  Farmers can register through USSD or web portal. Create your profile by providing basic information and farm details.
                </Paragraph>
              </Panel>
              <Divider className="my-0" />
              <Panel 
                header={
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text strong>Credit Score Assessment</Text>
                  </Space>
                } 
                key="2"
              >
                <Paragraph className="text-gray-600">
                  Our system analyzes your farming history, income patterns, and other factors to generate a credit score.
                </Paragraph>
              </Panel>
              <Divider className="my-0" />
              <Panel 
                header={
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text strong>Loan Application Process</Text>
                  </Space>
                } 
                key="3"
              >
                <Paragraph className="text-gray-600">
                  Apply for loans based on your credit score. Submit required documents and track your application status.
                </Paragraph>
              </Panel>
              <Divider className="my-0" />
              <Panel 
                header={
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text strong>Loan Disbursement</Text>
                  </Space>
                } 
                key="4"
              >
                <Paragraph className="text-gray-600">
                  Once approved, loans are disbursed directly to your registered account or through our partner financial institutions.
                </Paragraph>
              </Panel>
              <Divider className="my-0" />
              <Panel 
                header={
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text strong>Repayment & Monitoring</Text>
                  </Space>
                } 
                key="5"
              >
                <Paragraph className="text-gray-600">
                  Make repayments through USSD or web portal. Monitor your loan status and credit score improvements.
                </Paragraph>
              </Panel>
            </Collapse>
          </Card>
        </div>
      </section>

      <Footer />

      <LoginModal visible={isModalVisible} onCancel={handleCancel} />
    </div>
  );
}

export default LandingPage; 