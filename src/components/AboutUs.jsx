import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';
import { AnimatedPhoneMockups } from './Hero';
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

        {/* Main Content Grid - Stats cards floating around phones like messages */}
        <div ref={sectionRef} className="relative max-w-6xl mx-auto flex justify-center items-center mb-20 min-h-[600px] px-4">
          {/* Center - Animated Phone Mockups */}
          <div className={`relative z-10 transition-all duration-1000 ${
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-12 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '300ms' }}>
            <AnimatedPhoneMockups />
          </div>

          {/* Floating Stats Cards positioned around phones */}
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            // Better positioned cards for proper alignment
            const positions = [
              { top: '10%', left: '0%', origin: 'bottom-right' }, // Top left
              { top: '10%', right: '0%', origin: 'bottom-left' }, // Top right  
              { bottom: '10%', left: '0%', origin: 'top-right' }, // Bottom left
              { bottom: '10%', right: '0%', origin: 'top-left' } // Bottom right
            ];
            
            const pos = positions[index];
            
            return (
              <div
                key={index}
                className={`absolute w-56 lg:w-64 bg-white rounded-2xl p-6 shadow-2xl border border-[#FF9933]/20 group cursor-pointer transform transition-all duration-1000 hover:scale-105 hover:shadow-3xl ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                    : 'translate-y-16 opacity-0 scale-75 rotate-3'
                }`}
                style={{ 
                  ...pos,
                  transitionDelay: `${(index + 1) * 400}ms`,
                  animation: isVisible ? `messagePopup 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${(index + 1) * 400}ms both` : '',
                  transformOrigin: pos.origin,
                  boxShadow: '0 20px 60px -10px rgba(255, 153, 51, 0.25)'
                }}
              >
                {/* Message bubble tail */}
                <div 
                  className="absolute w-4 h-4 bg-white border-l border-b border-[#FF9933]/20 transform rotate-45"
                  style={{
                    [pos.origin.includes('right') ? 'right' : 'left']: '-8px',
                    [pos.origin.includes('top') ? 'top' : 'bottom']: '20px'
                  }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF9933]/10 flex items-center justify-center group-hover:bg-[#FF9933]/20 transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#FF9933] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-2xl lg:text-3xl font-bold text-[#FF9933] mb-1 group-hover:text-[#E68A2E] transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-xs lg:text-sm font-medium text-gray-700 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated dots indicator */}
                  <div className="flex gap-1 opacity-60 justify-center">
                    <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes messagePopup {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px) rotate(10deg);
            filter: blur(10px);
          }
          30% {
            opacity: 0.8;
            transform: scale(0.8) translateY(20px) rotate(5deg);
            filter: blur(5px);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) translateY(-10px) rotate(-2deg);
            filter: blur(0px);
          }
          80% {
            transform: scale(0.95) translateY(5px) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
            filter: blur(0px);
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
        
        /* Add floating animation to visible cards */
        .message-card-visible {
          animation: float 6s ease-in-out infinite, glow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
