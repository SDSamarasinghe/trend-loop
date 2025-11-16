import React from 'react';
import { Briefcase } from 'lucide-react';

const services = [
  {
    title: 'Video Production',
    description: 'High-quality video content for brand awareness and engagement.'
  },
  {
    title: 'Email Campaigns',
    description: 'Strategic email marketing to nurture leads and drive conversions.'
  },
  {
    title: 'Social Media Management',
    description: 'Grow and engage your audience across all major platforms.'
  },
  {
    title: 'Content Strategy',
    description: 'Data-driven content planning for measurable results.'
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left: Text */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#FF9933]/30 text-[#FF9933] rounded-lg p-2">
              <Briefcase className="w-6 h-6" />
            </span>
            <span className="font-semibold text-lg text-black">Services</span>
          </div>
          <h2 className="font-bold text-black text-4xl md:text-5xl mb-6 leading-tight">Comprehensive marketing services for measurable growth</h2>
          <div className="space-y-4 mb-8">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="bg-[#FF9933]/10 text-[#FF9933] rounded-full px-3 py-1 font-semibold text-xs">{service.title}</span>
                <span className="text-gray-700 text-sm">{service.description}</span>
              </div>
            ))}
          </div>
          <button className="bg-[#FF9933] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#E68A2E] transition-all hover:shadow-xl flex items-center gap-2">
            Explore all services
            <Briefcase className="w-5 h-5 text-white" />
          </button>
        </div>
        {/* Right: Decorative Chart */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[340px] h-[340px]">
            <div className="absolute inset-0 rounded-full bg-[#FF9933]/5 border-2 border-[#FF9933]/10"></div>
            <div className="absolute inset-8 rounded-full bg-[#FF9933]/10 border-2 border-[#FF9933]/20"></div>
            <div className="absolute inset-16 rounded-full bg-[#FF9933]/20 border-2 border-[#FF9933]/30"></div>
            <div className="absolute inset-24 rounded-full bg-[#FF9933]/30 border-2 border-[#FF9933]/40"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-56">
              <span className="text-gray-500 text-sm mb-2">Service Reach</span>
              <span className="text-[#FF9933] text-4xl font-bold mb-1">4</span>
              <span className="text-[#FF9933] text-lg font-semibold">Core Services</span>
              <span className="text-gray-400 text-xs mt-2">All tailored for your brand</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
