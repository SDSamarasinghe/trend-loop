import React, { useEffect, useRef, useState } from 'react';
import { Target, Users, Crosshair, Calendar, Rocket, MessageSquare, FileText, Video, Edit, Share2 } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    number: '01',
    title: 'Onboarding',
    icon: Target,
    description: 'We begin with a deep dive into your brand. We analyze your background, industry, audience, and competitors to fully understand your goals and creative direction. This helps us build content that is relevant, engaging, and aligned with your brand identity.',
    side: 'left'
  },
  {
    id: 2,
    number: '02',
    title: 'Booking',
    icon: Calendar,
    description: 'Once everything is confirmed, we book your shoot date and handle all scheduling details — including location, timing, and setup. You\'ll receive a calendar invite so everything is organized and easy to follow.',
    side: 'right'
  },
  {
    id: 3,
    number: '03',
    title: 'Content Scripting',
    icon: FileText,
    description: 'We create engaging and clear scripts and content plans based on your business and goals. This helps make your message easy to understand and keeps your audience interested.',
    side: 'left'
  },
  {
    id: 4,
    number: '04',
    title: 'Production',
    icon: Video,
    description: 'We record all the required content during the scheduled time. Our studio has a teleprompter to help you speak comfortably, and we guide you through the entire process to make the shoot smooth and easy.',
    side: 'right'
  },
  {
    id: 5,
    number: '05',
    title: 'Post-Production',
    icon: Edit,
    description: 'We handle all post-production elements — editing, sound design, color, text overlays, and more. Delivery is done within 7–10 days, depending on the amount of content included in your package.',
    side: 'left'
  },
  {
    id: 6,
    number: '06',
    title: 'Content Management',
    icon: Share2,
    description: 'We take full control of your social media posting so you don\'t have to worry about it. We create your monthly content schedule, write captions, select effective hashtags, and post at the best times — ensuring your pages stay active, consistent, and easy to manage without taking up your time.',
    side: 'right'
  }
];

const ProcessStep = ({ step, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  const Icon = step.icon;
  const isLeft = step.side === 'left';

  return (
    <div
      ref={stepRef}
      className={`grid grid-cols-[1fr_auto_1fr] gap-8 mb-20 transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : isLeft
          ? 'opacity-0 -translate-x-32'
          : 'opacity-0 translate-x-32'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left side content */}
      <div className={`flex flex-col ${isLeft ? 'items-end text-right' : ''}`}>
        {isLeft && (
          <>
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-5xl md:text-6xl font-bold text-black">{step.title}</h3>
              <span className="text-5xl md:text-6xl font-bold text-[#FF9933]">.{step.number}</span>
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-md">{step.description}</p>
          </>
        )}
      </div>

      {/* Center icon box */}
      <div className="flex items-start justify-center pt-2">
        <div className="w-20 h-20 bg-white border-2 border-[#FF9933]/40 rounded-lg flex items-center justify-center hover:border-[#FF9933] hover:bg-[#FFF9E6] hover:shadow-lg hover:shadow-[#FF9933]/20 transition-all duration-300">
          <Icon className="w-10 h-10 text-[#FF9933]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Right side content */}
      <div className={`flex flex-col ${!isLeft ? 'items-start text-left' : ''}`}>
        {!isLeft && (
          <>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl md:text-6xl font-bold text-[#FF9933]">.{step.number}</span>
              <h3 className="text-5xl md:text-6xl font-bold text-black">{step.title}</h3>
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-md">{step.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

const ProcessSection = () => {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
            How We Do It
          </h2>
          {/* <p className="text-2xl md:text-3xl text-[#FF9933] italic font-serif">
            The Bloom Process
          </p> */}
        </div>

        {/* Vertical line in the center - adjusted positioning */}
        <div className="absolute left-1/2 top-56 bottom-10 w-px bg-gradient-to-b from-[#FF9933]/60 via-[#FF9933]/30 to-transparent transform -translate-x-1/2 hidden lg:block"></div>

        {/* Process Steps */}
        <div className="relative">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
