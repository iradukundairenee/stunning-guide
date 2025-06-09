import { Typography, Row, Col, Space } from 'antd';
import { TwitterOutlined, FacebookFilled, InstagramOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} md={8}>
            <Link to="/">
              <div className="text-2xl font-bold text-white mb-4">TechCrop</div>
            </Link>
            <Paragraph className="text-white text-sm">
              Empowering farmers through digital financial solutions
            </Paragraph>
          </Col>

          {/* Quick Links */}
          <Col xs={24} md={4}>
            <h2 className="text-white mb-4">Quick Links</h2>
            <Space direction="vertical" size="small">
              <Link to="#features-section" className="text-white hover:text-green-100">Features</Link>
              <Link to="#how-it-works" className="text-white hover:text-green-100">How It Works</Link>
              <Link to="#testimonials-section" className="text-white hover:text-green-100">Testimonials</Link>
            </Space>
          </Col>

          {/* Support */}
          <Col xs={24} md={4}>
            
            <h2 className="text-white mb-4">Support</h2>
            <Space direction="vertical" size="small">
              <Link to="#" className="text-white hover:text-green-100">Help Center</Link>
              <Link to="#contact-section" className="text-white hover:text-green-100">Contact Us</Link>
              <Link to="#" className="text-white hover:text-green-100">Privacy Policy</Link>
            </Space>
          </Col>

          {/* Connect */}
          <Col xs={24} md={8}>
           <h2 className="text-white mb-4">connect</h2>
            <Space size="large">
              <a href="#" className="text-white hover:text-green-100 text-xl"><TwitterOutlined /></a>
              <a href="#" className="text-white hover:text-green-100 text-xl"><FacebookFilled /></a>
              <a href="#" className="text-white hover:text-green-100 text-xl"><InstagramOutlined /></a>
            </Space>
          </Col>
        </Row>

        <div className="text-center border-t border-green-600 pt-8 mt-8">
          <Paragraph className="text-white text-sm mb-0">
            &copy; {new Date().getFullYear()} tecGrw Ltd. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 