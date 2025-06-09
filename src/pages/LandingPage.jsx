import { useState, useEffect } from 'react';
import LoginModal from '../components/LoginModal';
import LandingPageHeader from '../components/layout/LandingPageHeader';
import Footer from '../components/layout/Footer';
import { Button, Typography, Card, Row, Col, Space } from 'antd';
import { MobileOutlined, LineChartOutlined, DollarCircleOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';

// Import all hero images
import heroImage2 from '../assets/images/Screenshot 2025-06-09 125630.png';
import heroImage3 from '../assets/images/tim-mossholder-xDwEa2kaeJA-unsplash.jpg';
import heroImage4 from '../assets/images/Screenshot 2025-06-09 125630.png';
import heroImage5 from '../assets/images/Screenshot 2025-06-09 125607.png';

const heroImages = [heroImage2,heroImage3, heroImage4, heroImage5];

const { Title, Paragraph, Text } = Typography;

function LandingPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LandingPageHeader onSignInClick={showModal} />

      {/* Hero Section with image carousel */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Empowering Farmers with <span className="text-white">Digital Credit Solutions</span>
          </h1>
          <Paragraph className="text-lg text-gray-200 mb-8">
            Access financial services, track income, and build credit scores through our integrated USSD and web platform.
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }} onClick={showModal}>
              Get Started
            </Button>
            <Button size="large" ghost style={{ borderColor: '#fff', color: '#fff' }} onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </Space>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features-section" className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <Title level={2} className="mb-12">Key Features</Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card hoverable className="h-full text-center">
                <MobileOutlined style={{ fontSize: '48px', color: '#16a34a' }} className="mb-4" />
                <Title level={4}>USSD Access</Title>
                <Paragraph className="text-gray-600">
                  Access services from any basic phone without internet connection.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable className="h-full text-center">
                <LineChartOutlined style={{ fontSize: '48px', color: '#16a34a' }} className="mb-4" />
                <Title level={4}>Credit Scoring</Title>
                <Paragraph className="text-gray-600">
                  Build your creditworthiness through farm activity tracking.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card hoverable className="h-full text-center">
                <DollarCircleOutlined style={{ fontSize: '48px', color: '#16a34a' }} className="mb-4" />
                <Title level={4}>Loan Access</Title>
                <Paragraph className="text-gray-600">
                  Connect with financial institutions for farming loans.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Title level={2} className="mb-12">How It Works</Title>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={6}>
              <div className="flex flex-col items-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">1</div>
                <Title level={5}>Register</Title>
                <Paragraph className="text-gray-600">Sign up via USSD</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="flex flex-col items-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">2</div>
                <Title level={5}>Track Income</Title>
                <Paragraph className="text-gray-600">Record your farm sales and expenses</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="flex flex-col items-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">3</div>
                <Title level={5}>Build Credit</Title>
                <Paragraph className="text-gray-600">Develop your credit score over time</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="flex flex-col items-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">4</div>
                <Title level={5}>Access Loans</Title>
                <Paragraph className="text-gray-600">Apply for loans with partner institutions</Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us-section" className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <Title level={2} className="mb-12">About Us</Title>
          <Paragraph className="text-lg text-gray-700">
            We go beyond loans, offering crucial support in farm management, mitigating post-harvest losses, and providing vital climate change information to ensure every farmer's success. We need to make sure the loan achieves its goal.
          </Paragraph>
        </div>
      </section>

      {/* Farmer Success Stories Section */}
      <section id="testimonials-section" className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Title level={2} className="mb-12">Farmer Success Stories</Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card className="h-full">
                <div className="flex flex-col items-center text-center">
                  <UserOutlined style={{ fontSize: '64px', color: '#16a34a' }} className="mb-4" />
                  <Paragraph className="text-lg italic mb-4">"TechCrop helped me access my first farm loan and expand my operations."</Paragraph>
                  <Text strong className="text-green-600">John Doe</Text>
                  <Text type="secondary">Maize Farmer</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full">
                <div className="flex flex-col items-center text-center">
                  <UserOutlined style={{ fontSize: '64px', color: '#16a34a' }} className="mb-4" />
                  <Paragraph className="text-lg italic mb-4">"The USSD service is perfect for managing my farm finances without internet."</Paragraph>
                  <Text strong className="text-green-600">Jane Smith</Text>
                  <Text type="secondary">Rice Farmer</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full">
                <div className="flex flex-col items-center text-center">
                  <UserOutlined style={{ fontSize: '64px', color: '#16a34a' }} className="mb-4" />
                  <Paragraph className="text-lg italic mb-4">"Building a credit score has opened new opportunities for my farming business."</Paragraph>
                  <Text strong className="text-green-600">Mike Johnson</Text>
                  <Text type="secondary">Vegetable Farmer</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Ready to Get Started Section */}
      {/* <section id="contact-section" className="py-20 px-8 bg-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Title level={2} className="text-white mb-4">Ready to Get Started?</Title>
          <Paragraph className="text-gray-200 mb-8">
            Join thousands of farmers who are already using TechCrop
          </Paragraph>
          <Button type="primary" size="large" style={{ backgroundColor: '#fff', borderColor: '#fff', color: '#16a34a' }} onClick={showModal}>
            Register Now
          </Button>
        </div>
      </section> */}

      <Footer />

      <LoginModal visible={isModalVisible} onCancel={handleCancel} />
    </div>
  );
}

export default LandingPage; 