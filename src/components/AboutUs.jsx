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

        {/* Two-column layout: phone left, bento cards right (desktop/tablet) */}
        <div ref={sectionRef} className="relative max-w-7xl mx-auto mb-24 md:grid md:grid-cols-[400px_1fr] md:gap-8 lg:gap-12 items-center px-4">
          <div
            className={`relative z-10 transition-all duration-800 flex justify-center md:justify-center ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <SinglePhoneMockup />
          </div>

          {/* Bento grid cards on the right */}
          <div className="hidden md:grid grid-cols-2 gap-4 lg:gap-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/95 backdrop-blur-xl rounded-[20px] p-6 lg:p-7 shadow-lg border border-gray-100/60 group transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-[#FF9933] hover:to-[#FF7700] hover:border-[#FF9933] flex flex-col justify-between min-h-[160px]`}
                  style={{
                    transitionDelay: `${280 + index * 140}ms`,
                    animation: isVisible ? `modernSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${320 + index * 180}ms both` : undefined,
                  }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/5 group-hover:bg-white/20 transition-all duration-500 shadow-sm flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#FF9933] group-hover:text-white transition-all duration-500" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-[#FF9933] to-[#FF7700] bg-clip-text text-transparent leading-none mb-2 group-hover:text-white group-hover:bg-none transition-all duration-500">
                        {stat.value}
                      </div>
                      <div className="text-sm lg:text-base font-semibold text-gray-700 leading-tight group-hover:text-white/95 transition-colors duration-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-100 group-hover:border-white/30 transition-colors duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] group-hover:bg-white transition-colors animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/60 group-hover:bg-white/80 transition-colors animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/30 group-hover:bg-white/60 transition-colors animate-pulse" style={{ animationDelay: '300ms' }} />
                    <span className="text-[10px] font-medium text-gray-400 group-hover:text-white/90 uppercase tracking-wider ml-1">Live</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile cards (stacked below phone) */}
        <div className="md:hidden max-w-xl mx-auto grid grid-cols-1 xs:grid-cols-2 gap-4 px-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-white/95 rounded-2xl p-5 shadow-md border border-gray-100/60 group transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } hover:bg-gradient-to-br hover:from-[#FF9933] hover:to-[#FF7700] hover:shadow-lg`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FF9933]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#FF9933] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#FF9933] group-hover:text-white transition-colors">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-700 group-hover:text-white/95 transition-colors">{stat.label}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100 group-hover:border-white/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] group-hover:bg-white transition-colors" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/60 group-hover:bg-white/80 transition-colors" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/30 group-hover:bg-white/60 transition-colors" />
                  <span className="text-[10px] font-medium text-gray-400 group-hover:text-white/90 uppercase tracking-wider ml-1">Live Metric</span>
                </div>
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
