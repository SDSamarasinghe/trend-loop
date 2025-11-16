import React, { useState } from 'react';
import { Mail, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/trend loop logo .png" 
              alt="TrendLoop Media" 
              className="h-8 md:h-10 w-auto cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-700 hover:text-[#FF9933] transition-colors font-medium"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden md:flex bg-[#FF9933] border-2 border-[#FF9933] text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium hover:bg-[#E68A2E] transition-all hover:shadow-md items-center space-x-2">
              <span className="text-sm md:text-base text-white">Join Waitlist</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-md rounded-3xl shadow-lg py-4 px-6 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-700 hover:text-[#FF9933] transition-colors font-medium text-left py-2"
                >
                  {link.name}
                </button>
              ))}
              <button className="bg-[#FF9933] text-black px-6 py-3 rounded-full font-medium hover:bg-[#E68A2E] transition-all mt-2 flex items-center justify-center space-x-2">
                <span className="text-white">Join Waitlist</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
