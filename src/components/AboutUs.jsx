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
            // Restored wider bubble positions (slightly farther out for larger width)
            const positions = [
              { top: '8%', left: '2%', origin: 'bottom-right' },      // top-left
              { top: '8%', right: '2%', origin: 'bottom-left' },      // top-right
              { bottom: '8%', left: '2%', origin: 'top-right' },      // bottom-left
              { bottom: '8%', right: '2%', origin: 'top-left' }       // bottom-right
            ];
            const pos = positions[index];
            return (
              <div
                key={index}
                className={`absolute w-64 md:w-72 bg-white rounded-3xl p-8 shadow-2xl border border-[#FF9933]/20 group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
                } hover:shadow-3xl hover:scale-[1.04]`}
                style={{
                  ...pos,
                  transitionDelay: `${320 + index * 200}ms`,
                  animation: isVisible ? `messagePopup 1.15s cubic-bezier(0.19, 1, 0.22, 1) ${320 + index * 200}ms both` : undefined,
                  transformOrigin: pos.origin,
                  boxShadow: '0 24px 70px -12px rgba(255,153,51,0.28)'
                }}
              >
                {/* Bubble tail */}
                <div
                  className="absolute w-6 h-6 bg-white border-l border-b border-[#FF9933]/20 transform rotate-45"
                  style={{
                    [pos.origin.includes('right') ? 'right' : 'left']: '-14px',
                    [pos.origin.includes('top') ? 'top' : 'bottom']: '38px'
                  }}
                />
                <div className="relative z-10 overflow-hidden">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF9933]/10 flex items-center justify-center group-hover:bg-[#FF9933]/20 transition-all duration-500 shadow-inner">
                      <Icon className="w-8 h-8 text-[#FF9933] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-4xl font-extrabold text-[#FF9933] leading-none mb-2 group-hover:animate-valuePop">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-700 leading-tight group-hover:animate-labelSlide">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  {/* Conversation inner animation layer */}
                  <div className="relative h-8 mt-1">
                    <div className="absolute inset-0 flex items-center gap-2">
                      <div className="flex gap-1 group-hover:animate-dotsFlow">
                        <span className="dot-anim w-2 h-2 rounded-full bg-[#FF9933]" />
                        <span className="dot-anim w-2 h-2 rounded-full bg-[#FF9933]" style={{ animationDelay: '140ms' }} />
                        <span className="dot-anim w-2 h-2 rounded-full bg-[#FF9933]" style={{ animationDelay: '280ms' }} />
                      </div>
                      <div className="text-[11px] font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        updating metric...
                      </div>
                    </div>
                  </div>
                  {/* Hover reveal gradient */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#FF9933]/5 via-transparent to-[#FF9933]/10 transition-opacity duration-700" />
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
        
        @keyframes valuePop {
          0% { transform: translateY(6px) scale(0.95); opacity:0.2; }
          50% { transform: translateY(-4px) scale(1.05); opacity:1; }
          100% { transform: translateY(0) scale(1); opacity:1; }
        }
        .animate-valuePop { animation: valuePop 600ms ease-out forwards; }

        @keyframes labelSlide {
          0% { transform: translateX(-12px); opacity:0; }
          60% { transform: translateX(4px); opacity:1; }
          100% { transform: translateX(0); opacity:1; }
        }
        .animate-labelSlide { animation: labelSlide 700ms cubic-bezier(0.19,1,0.22,1) forwards; }

        @keyframes dotsFlow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-dotsFlow { animation: dotsFlow 1200ms ease-in-out infinite; }
        .dot-anim { animation: pulseDot 1200ms ease-in-out infinite; }
        @keyframes pulseDot {
          0%, 100% { transform: scale(0.7); opacity:0.4; }
          50% { transform: scale(1); opacity:1; }
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
