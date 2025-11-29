import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';
import SinglePhoneMockup from './SinglePhoneMockup';
const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { label: 'One Stop Service', value: '360°', icon: CheckCircle2 },
    { label: 'Satisfied Clients', value: '50+', icon: Users },
    { label: 'Delivery Rate', value: '100%', icon: TrendingUp },
    { label: 'Projects Completed', value: '200+', icon: Award }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
    <section id="about" className="relative pt-32 pb-20 bg-gradient-to-b from-[#FFFBF0] via-[#FFFBF5] to-white overflow-hidden -mt-16">
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

        {/* Single Phone with surrounding stat cards */}
        <div ref={sectionRef} className="relative max-w-5xl mx-auto flex justify-center items-center mb-20 min-h-[560px] px-4">
          <div
            className={`relative z-10 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <SinglePhoneMockup />
          </div>

          {stats.map((stat, index) => {
            const Icon = stat.icon;
            // Modern card positions with more spacing from phone mockup
            const positions = [
              { top: '8%', left: '-2%', origin: 'bottom-right' },      // top-left
              { top: '8%', right: '-2%', origin: 'bottom-left' },      // top-right
              { bottom: '8%', left: '-2%', origin: 'top-right' },      // bottom-left
              { bottom: '8%', right: '-2%', origin: 'top-left' }       // bottom-right
            ];
            const pos = positions[index];
            return (
              <div
                key={index}
                className={`absolute w-72 md:w-80 bg-white/95 backdrop-blur-xl rounded-[28px] p-6 shadow-lg border border-gray-100/50 group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
                } hover:shadow-2xl hover:scale-[1.05] hover:bg-gradient-to-br hover:from-[#FF9933] hover:to-[#FF7700] hover:border-[#FF9933]`}
                style={{
                  ...pos,
                  transitionDelay: `${320 + index * 200}ms`,
                  animation: isVisible ? `modernSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${320 + index * 200}ms both` : undefined,
                  transformOrigin: pos.origin,
                  boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 153, 51, 0.08)'
                }}
              >
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#FF9933]/0 via-[#FF9933] to-[#FF9933]/0 group-hover:bg-gradient-to-r group-hover:from-white/0 group-hover:via-white group-hover:to-white/0 rounded-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="relative">
                  {/* Icon circle with modern styling */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/5 mb-4 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/20 transition-all duration-500 shadow-sm">
                    <Icon className="w-8 h-8 text-[#FF9933] group-hover:text-white group-hover:scale-110 transition-all duration-500" strokeWidth={2.5} />
                  </div>
                  
                  {/* Value with modern typography */}
                  <div className="mb-2">
                    <div className="text-5xl font-bold bg-gradient-to-br from-[#FF9933] to-[#FF7700] bg-clip-text text-transparent leading-none mb-3 group-hover:scale-105 group-hover:text-white group-hover:bg-none transition-all duration-500">
                      {stat.value}
                    </div>
                    <div className="text-base font-semibold text-gray-700 leading-snug group-hover:text-white/95 transition-colors duration-500">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Modern progress indicator */}
                  <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100 group-hover:border-white/30 transition-colors duration-500">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] group-hover:bg-white animate-pulse transition-colors duration-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/60 group-hover:bg-white/80 animate-pulse transition-colors duration-500" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/30 group-hover:bg-white/60 animate-pulse transition-colors duration-500" style={{ animationDelay: '300ms' }} />
                    </div>
                    <div className="text-[10px] font-medium text-gray-400 group-hover:text-white/90 uppercase tracking-wider ml-1 transition-colors duration-500">
                      Live Metric
                    </div>
                  </div>
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#FF9933]/[0.02] via-transparent to-[#FF9933]/[0.03] transition-opacity duration-700 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes modernSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(30px);
          }
          60% {
            opacity: 1;
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 20px 60px -10px rgba(255, 153, 51, 0.25);
          }
          50% {
            box-shadow: 0 25px 80px -5px rgba(255, 153, 51, 0.4);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
