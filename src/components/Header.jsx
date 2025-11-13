import React, { useState } from 'react';
import { Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { navigationItems } from '../data/mock';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/trend loop logo .png" 
              alt="TrendLoop Media" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-gray-700 hover:text-black transition-colors flex items-center space-x-1 font-medium">
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
                {item.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg py-2 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.items.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {/* <button className="text-gray-700 font-medium hover:text-black transition-colors">
              Sign In
            </button> */}
            <button className="bg-[#FFD000] border-2 border-[#FFD000] text-black px-6 py-2.5 rounded-full font-medium hover:bg-[#FFEA00] hover:text-black transition-all hover:shadow-md flex items-center space-x-2">
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
