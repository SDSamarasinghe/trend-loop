import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

// TikTok SVG Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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
    icon: <TikTokIcon className="w-5 h-5" />,
    label: 'TikTok',
    href: 'https://tiktok.com/',
    color: 'hover:bg-[#000000]'
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
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:scale-110 transition-all border border-gray-200 text-[#FF9933] ${item.color} hover:text-white`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
