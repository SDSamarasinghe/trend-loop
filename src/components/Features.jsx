import React from 'react';
import { Inbox, Settings, Zap, ArrowRight } from 'lucide-react';
import { features, heroFaqs } from '../data/mock';

const iconMap = {
  Inbox: Inbox,
  Settings: Settings,
  Zap: Zap
};

const Features = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-32">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          const isReversed = index % 2 === 1;

          return (
            <div
              key={feature.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                isReversed ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Text Content */}
              <div className={`space-y-6 ${isReversed ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FFD000] rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-black font-semibold text-lg">{feature.category}</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  {feature.title}
                </h2>

                {feature.badge && (
                  <div className="flex items-center space-x-3">
                    <span className="inline-block px-3 py-1 bg-[#FFF2B0] text-black text-sm font-semibold rounded-full border border-[#FFD000]/60">
                      {feature.badge}
                    </span>
                    <span className="text-[#CCAA00] font-medium">{feature.badgeText}</span>
                  </div>
                )}

                <p className="text-xl text-gray-700 leading-relaxed">
                  {feature.description}
                </p>

                <button className="group inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#FFD000] bg-[#FFD000] text-black rounded-full font-semibold hover:bg-[#FFEA00] hover:text-black transition-all">
                  <span>{feature.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-black" />
                </button>
              </div>

              {/* Illustration */}
              <div className={`${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                {feature.illustration === 'growth' && <GrowthIllustration />}
                {feature.illustration === 'automation' && <AutomationIllustrationWithFAQs />}
                {feature.illustration === 'transactional' && <TransactionalIllustration />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const GrowthIllustration = () => (
  <div className="relative w-full aspect-square max-w-md mx-auto">
  <div className="absolute inset-0 bg-gradient-to-br from-[#FFF2B0] to-[#FFFBEA] rounded-full opacity-50"></div>
    {/* Circular rings */}
    {[0, 1, 2, 3].map((ring) => (
      <div
        key={ring}
        className="absolute inset-0 rounded-full border-2 border-[#FFD9B3]"
        style={{
          transform: `scale(${0.4 + ring * 0.2})`,
          opacity: 1 - ring * 0.15
        }}
      ></div>
    ))}
    {/* Email icons */}
    {[0, 45, 90, 135].map((angle, i) => (
      <div
        key={i}
        className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -140px)`
        }}
      >
  <Inbox className="w-6 h-6 text-[#FFD000]" />
      </div>
    ))}
    {/* Center card */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 min-w-[200px]">
      <p className="text-sm text-gray-600 mb-1">Audience Growth</p>
  <p className="text-4xl font-bold text-[#FFD000]">80 (+23%)</p>
      <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
    </div>
  </div>
);

const AutomationIllustration = () => (
  <div className="relative w-full aspect-square max-w-md mx-auto">
  <div className="absolute inset-0 bg-gradient-to-br from-[#FFF2B0] to-[#FFFBEA] rounded-full opacity-50"></div>
    {/* Flow diagram */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-4 text-center min-w-[180px]">
  <Inbox className="w-8 h-8 text-[#FFD000] mx-auto mb-2" />
        <p className="text-sm font-semibold text-black">EMAIL WAS OPENED?</p>
      </div>
      <div className="flex space-x-4">
        <div className="bg-white rounded-lg shadow-lg p-3 text-center flex-1">
          <p className="text-xs font-semibold text-green-600">YES</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-3 text-center flex-1">
          <p className="text-xs font-semibold text-red-600">NO</p>
        </div>
      </div>
    </div>
  </div>
);

const AutomationIllustrationWithFAQs = () => (
  <div className="space-y-4">
    {heroFaqs.map((faq, index) => (
      <div
        key={faq.id}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform rotate-[-1deg] hover:rotate-0"
      >
        <div className="flex items-start space-x-4">
          <div className="text-4xl flex-shrink-0">{faq.icon}</div>
          <div className="flex-1">
            <h3 className="font-bold text-black text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const TransactionalIllustration = () => {
  // Team member avatars - reduced to 6 for better spacing
  const teamMembers = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
  ];

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Large yellow circle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9E6] via-[#FFF5CC] to-[#FFEB99] rounded-full opacity-80"></div>
      
      {/* Email cards - positioned slightly left */}
      <div className="absolute top-1/2 left-[35%] transform -translate-x-1/2 -translate-y-1/2 space-y-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl p-5 w-[220px] transform transition-all hover:scale-105"
            style={{
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
            <div className="h-3 bg-gray-200 rounded mb-3 w-4/5"></div>
            <div className="h-3 bg-gray-200 rounded w-3/5"></div>
          </div>
        ))}
      </div>

      {/* Team avatars arranged vertically on the right side - no overlap */}
      <div className="absolute top-1/2 right-[12%] transform -translate-y-1/2">
        <div className="flex flex-col space-y-3">
          {teamMembers.map((avatar, index) => (
            <div
              key={index}
              className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white transform transition-all hover:scale-110 hover:shadow-2xl"
            >
              <img
                src={avatar}
                alt={`Team member ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Features;
