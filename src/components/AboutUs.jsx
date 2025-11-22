import React from 'react';
import { CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: 'One Stop Service', value: '360°', icon: CheckCircle2 },
    { label: 'Satisfied Clients', value: '50+', icon: Users },
    { label: 'Delivery Rate', value: '100%', icon: TrendingUp },
    { label: 'Projects Completed', value: '200+', icon: Award }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      specialty: 'Brand Strategy'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Videographer',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      specialty: 'Video Production'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Strategist',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      specialty: 'Social Media'
    },
    {
      name: 'David Kim',
      role: 'Marketing Director',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      specialty: 'Campaign Strategy'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Results-Driven',
      description: 'Every campaign is measured and optimized for maximum impact and ROI.'
    },
    {
      icon: '💡',
      title: 'Creative Excellence',
      description: 'Pushing boundaries with innovative content that stands out from the crowd.'
    },
    {
      icon: '🤝',
      title: 'Client-Focused',
      description: 'Your success is our success. We build lasting partnerships, not just projects.'
    },
    {
      icon: '⚡',
      title: 'Fast & Agile',
      description: 'Quick turnarounds without compromising quality or creative vision.'
    }
  ];

  return (
    <section id="about" className="relative pt-24 pb-20 bg-gradient-to-b from-white via-[#FFFBF0] to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-[#FF9933]/10 px-4 py-2 rounded-full">
            <span className="text-[#FF9933] font-semibold text-lg">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Meet the New Face of <br />
            <span className="text-[#FF9933]">Social Media & Marketing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Based in Canada, we create quality social media content and marketing for both personal brands and businesses. Bold ideas. Creative strategies.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#FF9933]/10 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <Icon className="w-8 h-8 text-[#FF9933] mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Left: Team Grid */}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
