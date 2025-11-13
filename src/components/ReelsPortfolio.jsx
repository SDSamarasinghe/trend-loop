import React from 'react';
import { Play } from 'lucide-react';
import { reelsPortfolio } from '../data/mock';

// Theme color maps
const themeStyles = {
  blue: {
    overlay: 'from-blue-900/80 via-blue-700/40 to-blue-900/80',
    accent: 'text-blue-300'
  },
  red: {
    overlay: 'from-red-900/80 via-red-700/40 to-red-900/80',
    accent: 'text-red-300'
  },
  orange: {
    overlay: 'from-orange-900/80 via-orange-700/40 to-orange-900/80',
    accent: 'text-orange-200'
  },
  teal: {
    overlay: 'from-teal-900/80 via-teal-700/40 to-teal-900/80',
    accent: 'text-teal-200'
  },
  green: {
    overlay: 'from-green-900/80 via-green-700/40 to-green-900/80',
    accent: 'text-green-200'
  }
};

const ReelsPortfolio = () => {
  // Category filter bar
  const categories = [
    'All Cases', 'AI', 'B2B', 'B2C', 'Ecommerce', 'Fintech', 'Forex', 'Gaming',
    'Healthcare', 'iGaming', 'IT & Software', 'Real Estate', 'SaaS', 'Web3'
  ];
  const [selectedCategory, setSelectedCategory] = React.useState('All Cases');

  return (
    <section className="py-24 px-6 bg-white" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-6">
          <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl">
            <span className="text-black">Our Works</span>
            
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A snapshot of vertical content crafted to capture attention fast and reinforce brand authority across social platforms.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-7 py-3 rounded-full font-semibold text-base transition-all focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FFD000] to-[#FFEA00] text-black shadow-lg'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reels Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px] md:auto-rows-[260px]">
          {reelsPortfolio
            .filter(reel => selectedCategory === 'All Cases' || reel.category === selectedCategory)
            .map((reel, idx) => {
              const theme = themeStyles[reel.theme] || themeStyles.blue;
              const isTall = reel.size === 'tall';
              const heightClasses = isTall ? 'row-span-2' : 'row-span-1';
              return (
                <div
                  key={reel.id}
                  className={`group relative rounded-3xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex ${heightClasses}`}
                >
                  <div className="relative w-full h-full">
                  <img
                    src={reel.image}
                    alt={reel.titleBottom}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${theme.overlay} opacity-90 mix-blend-multiply pointer-events-none`}></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div className="text-left mt-1">
                      <h3 className="font-extrabold text-white text-2xl leading-tight drop-shadow-sm">
                        <span className={`${theme.accent}`}>{reel.titleTop}</span><br />
                        <span>{reel.titleBottom}</span>
                      </h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-black shadow-sm hover:shadow-md transition">
                        <Play className="w-4 h-4" />
                        Watch
                      </button>
                      <span className="text-white/70 text-xs font-medium">Reel #{reel.id}</span>
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-14 flex justify-center">
          <button className="bg-[#FFD000] hover:bg-[#FFEA00] text-black font-semibold px-10 py-4 rounded-full shadow-sm hover:shadow-lg transition">
            View full portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReelsPortfolio;
