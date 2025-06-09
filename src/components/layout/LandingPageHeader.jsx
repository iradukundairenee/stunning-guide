import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

function LandingPageHeader({ onSignInClick }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl font-bold text-green-600">TechCrop</div>
        </Link>

        <Space size="large">
          <Button type="link" onClick={() => scrollToSection('features-section')} style={{ color: '#333', fontWeight: 500 }}>Features</Button>
          <Button type="link" onClick={() => scrollToSection('how-it-works')} style={{ color: '#333', fontWeight: 500 }}>How It Works</Button>
          <Button type="link" onClick={() => scrollToSection('testimonials-section')} style={{ color: '#333', fontWeight: 500 }}>Testimonials</Button>
          <Button type="link" onClick={() => scrollToSection('contact-section')} style={{ color: '#333', fontWeight: 500 }}>Contact</Button>
        </Space>
      </div>
    </header>
  );
}

export default LandingPageHeader; 
