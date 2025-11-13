import React, { useEffect, useRef, useState } from 'react';
import { Target, Users, Crosshair, Calendar, Rocket, MessageSquare } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    number: '01',
    title: 'AUDIT',
    icon: Target,
    description: 'Analyze and evaluate your current performance (and your competitors\') to identify areas for improvement and develop an action plan for improved social media strategies.',
    side: 'left'
  },
  {
    id: 2,
    number: '02',
    title: 'COMMUNITY PLAYBOOK',
    icon: Users,
    description: 'Develop a comprehensive guide that outlines how to engage with and grow your brand\'s online community. It includes how to respond to comments and messages, handle crisis situations, and track and analyze KPIs.',
    side: 'right'
  },
  {
    id: 3,
    number: '03',
    title: 'SOCIAL MEDIA STRATEGY',
    icon: Crosshair,
    description: 'Establish a solid online presence through social media by defining your target audience, identifying crucial content pillars, and gaining a deep understanding of your brand personality and image.',
    side: 'left'
  },
  {
    id: 4,
    number: '04',
    title: 'CONTENT CALENDAR',
    icon: Calendar,
    description: 'Plan and organize social media content for the month, based on various factors such as seasonality, trends and key messages.',
    side: 'right'
  },
  {
    id: 5,
    number: '05',
    title: 'CONTENT CREATION',
    icon: Rocket,
    description: 'Produce engaging visuals (video, photo, digital images, GIF, etc.) for each publication based on platforms and previous top-performing posts.',
    side: 'left'
  },
  {
    id: 6,
    number: '06',
    title: 'COMMUNITY MANAGEMENT',
    icon: MessageSquare,
    description: 'Monitor platforms, respond to customer feedback and requests promptly, and engage in meaningful interactions with influencers, partners and customers.',
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
              <h3 className="text-xl font-bold text-black uppercase">{step.title}</h3>
              <span className="text-4xl font-bold text-[#FFD000]">.{step.number}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed max-w-md">{step.description}</p>
          </>
        )}
      </div>

      {/* Center icon box */}
      <div className="flex items-start justify-center pt-2">
        <div className="w-20 h-20 bg-gray-100 border-2 border-[#FFD000]/40 rounded-lg flex items-center justify-center hover:border-[#FFD000] hover:bg-[#FFF9E6] hover:shadow-lg hover:shadow-[#FFD000]/20 transition-all duration-300">
          <Icon className="w-10 h-10 text-[#FFD000]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Right side content */}
      <div className={`flex flex-col ${!isLeft ? 'items-start text-left' : ''}`}>
        {!isLeft && (
          <>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl font-bold text-[#FFD000]">.{step.number}</span>
              <h3 className="text-xl font-bold text-black uppercase">{step.title}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed max-w-md">{step.description}</p>
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
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFD000]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD000]/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
            How We Do It
          </h2>
          {/* <p className="text-2xl md:text-3xl text-[#FFD000] italic font-serif">
            The Bloom Process
          </p> */}
        </div>

        {/* Vertical line in the center - adjusted positioning */}
        <div className="absolute left-1/2 top-56 bottom-10 w-px bg-gradient-to-b from-[#FFD000]/60 via-[#FFD000]/30 to-transparent transform -translate-x-1/2 hidden lg:block"></div>

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
