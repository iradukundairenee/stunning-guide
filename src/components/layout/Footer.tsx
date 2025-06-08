import { Typography, Row, Col, Space, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;

function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-8">
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} md={8}>
            <h1 className="text-white mb-4">TechCrop</h1>
            <Paragraph className="text-white">
              TechCrop empowers farmers with tools to track farm performance, improve credit scores, and access timely financial support for sustainable growth.
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <h1 className="text-white mb-4">Quick Links</h1>
            <Space direction="vertical" size="small">
              <Link href="https://tecgrw.com/" target="_blank" className="hover:text-green-300" style={{ color: 'white' }}>
                <GlobalOutlined className="mr-2" /> Visit tecGrw
              </Link>
              <Link href="https://tecgrw.com/index.php/our-solutions" target="_blank" className="hover:text-green-300" style={{ color: 'white' }}>
                Our Solutions
              </Link>
              <Link href="https://tecgrw.com/index.php/education" target="_blank" className="hover:text-green-300" style={{ color: 'white' }}>
                Education
              </Link>
            </Space>
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={8}>
            <h1 className="text-white mb-4">Contact Us</h1>
            <Space direction="vertical" size="middle">
              <div className="flex items-center text-white">
                <MailOutlined className="mr-2 text-white" />
                <span className="text-white">
                  info@tecgrw.com
                </span>
              </div>
              <div className="flex items-center text-white">
                <PhoneOutlined className="mr-2 text-white" />
                <span className="text-white">
                  +250 7989 75878
                </span>
              </div>
              <div className="flex items-center text-white">
                <EnvironmentOutlined className="mr-2 text-white" />
                <span className="text-white">100 KG 9 Ave, Kigali, Rwanda</span>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider className="border-gray-700 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <Paragraph className="text-white mb-0">
            &copy; {new Date().getFullYear()} TecGrw. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
