import { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

function LandingPageHeader({ onSignInClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close menu after clicking a link
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuButton = document.querySelector('.menu-button');
      const mobileMenu = document.querySelector('.mobile-menu');

      if (
        isMenuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.menu-button')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <Link to="/">
          <div className="text-2xl font-bold text-green-600">TechCrop</div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Button type="link" onClick={() => scrollToSection('features-section')} style={{ color: '#333', fontWeight: 500 }}>Features</Button>
          <Button type="link" onClick={() => scrollToSection('how-it-works')} style={{ color: '#333', fontWeight: 500 }}>How It Works</Button>
          <Button type="link" onClick={() => scrollToSection('testimonials-section')} style={{ color: '#333', fontWeight: 500 }}>Testimonials</Button>
          <Button type="link" onClick={() => scrollToSection('about-us-section')} style={{ color: '#333', fontWeight: 500 }}>About Us</Button>
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="menu-button md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger Icon */}
          <svg
            className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {/* Close Icon */}
          <svg
            className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={toggleMenu}
        ></div>

        {/* Menu Panel */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              <Button type="link" onClick={() => scrollToSection('features-section')} style={{ color: '#333', fontWeight: 500 }} className="block px-3 py-2 rounded-md text-base font-medium">Features</Button>
              <Button type="link" onClick={() => scrollToSection('how-it-works')} style={{ color: '#333', fontWeight: 500 }} className="block px-3 py-2 rounded-md text-base font-medium">How It Works</Button>
              <Button type="link" onClick={() => scrollToSection('testimonials-section')} style={{ color: '#333', fontWeight: 500 }} className="block px-3 py-2 rounded-md text-base font-medium">Testimonials</Button>
              <Button type="link" onClick={() => scrollToSection('about-us-section')} style={{ color: '#333', fontWeight: 500 }} className="block px-3 py-2 rounded-md text-base font-medium">About Us</Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default LandingPageHeader; 
