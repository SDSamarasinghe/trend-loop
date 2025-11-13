import React from 'react';
import { Mail, Twitter, Github, Linkedin } from 'lucide-react';
import { footerLinks } from '../data/mock';

const Footer = () => {
  return (
  <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/trend loop white .png" 
                alt="TrendLoop Media" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#CCC] leading-relaxed">
              Creative marketing services to grow, engage, and convert across channels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.link} className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#FFD000] text-sm">
            © 2025 TrendLoop Media. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#FFD000] hover:text-[#FFEA00] transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
