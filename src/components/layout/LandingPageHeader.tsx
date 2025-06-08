import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

interface LandingPageHeaderProps {
  onSignInClick: () => void;
}

function LandingPageHeader({ onSignInClick }: LandingPageHeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuButtonStyle = {
    color: '#16a34a', // green-600
    fontWeight: 500,
    padding: '4px 8px',
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl font-bold text-green-600">TechCrop</div>
        </Link>

        <Space size="large">
          <Button
            type="link"
            onClick={() => scrollToSection('access-section')}
            style={menuButtonStyle}
          >
            Access TechCrop
          </Button>
          <Button
            type="link"
            onClick={() => scrollToSection('how-it-works')}
            style={menuButtonStyle}
          >
            How It Works
          </Button>
        </Space>
      </div>
    </header>
  );
}

export default LandingPageHeader; 
