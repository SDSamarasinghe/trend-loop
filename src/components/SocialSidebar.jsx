import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    icon: <Facebook className="w-5 h-5" />,
    label: 'Facebook',
    href: 'https://facebook.com/',
    color: 'hover:bg-[#1877F2]'
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    label: 'Instagram',
    href: 'https://instagram.com/',
    color: 'hover:bg-[#E4405F]'
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    color: 'hover:bg-[#0077B5]'
  }
];

const SocialSidebar = () => {
  return (
    <div className="fixed top-1/2 left-6 -translate-y-1/2 z-50 flex flex-col gap-4">
      {socialLinks.map((item, idx) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:scale-110 transition-all border border-white/40 ${item.color}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
