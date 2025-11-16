import React from 'react';
import { Star } from 'lucide-react';

const ExpertsSection = () => {
  // Team member avatars
  const teamMembers = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert3',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert4',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert5',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert6',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert7',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert8'
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Gradient Background Card */}
        <div className="relative rounded-[3rem] bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#C084FC] p-16 overflow-hidden">
          {/* Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Meet the Experts Behind Your Success
            </h2>

            {/* Team Avatars and Rating */}
            <div className="flex items-center justify-center space-x-6">
              {/* Clutch Rating Badge */}
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-5 py-3 border border-white/30">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#2563EB]">C</span>
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-bold text-lg">4.9+</span>
                    <Star className="w-4 h-4 text-[#FF9933] fill-[#FF9933]" />
                  </div>
                  <span className="text-white/80 text-xs">rating on Clutch</span>
                </div>
              </div>

              {/* Team Avatars */}
              <div className="flex items-center -space-x-3">
                {teamMembers.map((avatar, index) => (
                  <div
                    key={index}
                    className="w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white transform transition-all hover:scale-110 hover:z-50"
                    style={{ zIndex: teamMembers.length - index }}
                  >
                    <img
                      src={avatar}
                      alt={`Expert ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                Book Intro Call
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
