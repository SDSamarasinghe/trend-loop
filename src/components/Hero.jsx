import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, MessageCircle, Send, ThumbsUp } from 'lucide-react';

import { heroTestimonials } from '../data/mock';
import { GridPattern } from './ui/shadcn-io/grid-pattern';
import { cn } from '../lib/utils';

// Horizontally scrolling brand logo marquee
const brandLogos = [
  { src: 'https://www.revolut.com/favicon.ico', alt: 'Revolut' },
  { src: 'https://www.yves-rocher.com/favicon.ico', alt: 'Yves Rocher' },
  { src: 'https://www.samsung.com/favicon.ico', alt: 'Samsung' },
  { src: 'https://www.logitech.com/favicon.ico', alt: 'Logitech' },
  { src: 'https://www.htx.com/favicon.ico', alt: 'HTX' },
  { src: 'https://www.ironfx.com/favicon.ico', alt: 'IronFX' },
  // Add more brand favicons as needed
];

function BrandLogoMarquee() {
  return (
    <div className="w-screen max-w-none bg-white py-8 overflow-hidden">
      <div className="relative flex flex-col gap-6">
        {/* Row 1: left to right */}
        <div className="marquee-row flex gap-20 items-center whitespace-nowrap animate-marquee px-8">
          {brandLogos.map((logo, idx) => (
            <img
              key={logo.alt + idx}
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain"
              style={{ minWidth: '140px', filter: 'none' }}
            />
          ))}
          {/* Repeat for seamless loop */}
          {brandLogos.map((logo, idx) => (
            <img
              key={logo.alt + '-repeat-' + idx}
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain"
              style={{ minWidth: '140px', filter: 'none' }}
            />
          ))}
        </div>
        {/* Row 2: right to left */}
        <div className="marquee-row flex gap-20 items-center whitespace-nowrap animate-marquee-reverse mt-4 px-8">
          {brandLogos.slice().reverse().map((logo, idx) => (
            <img
              key={logo.alt + '-rev-' + idx}
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain"
              style={{ minWidth: '140px', filter: 'none' }}
            />
          ))}
          {brandLogos.slice().reverse().map((logo, idx) => (
            <img
              key={logo.alt + '-rev-repeat-' + idx}
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain"
              style={{ minWidth: '140px', filter: 'none' }}
            />
          ))}
        </div>
      </div>
      {/* Marquee animation styles */}
      <style>{`
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 32s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-20 md:pb-28 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background Image with Professional Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/webland%20artboard.png)',
            filter: 'grayscale(100%)',
            opacity: 1
          }}
        />
        
        {/* Multi-layer Gradient Overlays for Professional Look */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-[#FFFBF0]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/40"></div>
        
        {/* Orange accent gradient overlay matching theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/3 via-transparent to-[#FF9933]/5"></div>
      </div>

      {/* Grid pattern overlay for depth */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "fill-[#FF9933]/10 stroke-[#FF9933]/10 z-[1]"
        )}
      />
      
      {/* Subtle decorative glow elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-3xl z-[1]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl z-[1]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-6">
        {/* Centered Hero Content */}
       <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8 mt-8 md:mt-12">
  <h1 className="font-bold text-black leading-[1.1] tracking-tight text-4xl md:text-6xl lg:text-7xl animate-fade-in-up">
    Trend<span className="relative inline-flex items-center">L<span
  className="relative inline-flex items-center mx-0.5"
style={{ transform: 'translateY(0.10em)' }}
  aria-hidden="true"
>

        <svg
          viewBox="0 0 120 56"
          className="inline-block w-10 h-5 md:w-16 md:h-8 lg:w-20 lg:h-10"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* outer rounded rect stroke */}
          <rect
            x="6"
            y="6"
            width="108"
            height="44"
            rx="22"
            fill="none"
            stroke="#FF9933"
            strokeWidth="12"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </span>op</span>
    <br />
    Your marketing,
    <br />
    <span className="text-[#FF9933]">simplified</span>
  </h1>

  <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in stagger-2 px-4">
    One subscription. Complete digital marketing solutions.
  </p>

  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5 animate-fade-in stagger-3 px-4">
    <button className="w-full sm:w-auto bg-[#FF9933] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#E68A2E] transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2 group">
      <span>Start 14-day free trial</span>
      {/* Replace ArrowRight with your icon component */}
      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform text-white" />
    </button>
    {/* <span className="text-sm md:text-base text-gray-600 font-medium">No credit card required</span> */}
  </div>
</div>

      </div>

  {/* Brand Logo Marquee - replaces stat cards - Full width outside container */}
  {/*
  <div className="mt-24 -mx-6">
    <BrandLogoMarquee />
  </div>
  */}
    </section>
  );
};

const AnimatedPhoneMockups = () => {
  const [likes, setLikes] = useState(1234);
  const [scrollPositionInsta, setScrollPositionInsta] = useState(0);
  const [scrollPositionFb, setScrollPositionFb] = useState(0);
  const [fbLikes, setFbLikes] = useState(980);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  // Instagram reel posts with real images
  const instagramReels = [
    {
      image: '/images/belly-fat.jpeg',
      caption: 'Filipinus struggling with belly fat',
      hashtags: '#fitness #health #wellness'
    },
    {
      image: '/images/budget-in-barry.jpeg',
      caption: '$700k budget in Barrie',
      hashtags: '#realestate #barrie #homebuying'
    },
    {
      image: '/images/dream-home.jpeg',
      caption: 'Finding your dream home without stress',
      hashtags: '#dreamhome #realestate #homeownership'
    },
    {
      image: '/images/home-buyer-programms.jpeg',
      caption: 'First time home buyer programs',
      hashtags: '#firsttimehomebuyer #realestate #programs'
    },
    {
      image: '/images/North-bay.jpeg',
      caption: 'Looking to invest North Bay',
      hashtags: '#investment #northbay #realestate'
    },
    {
      image: '/images/invest-real-state.jpeg',
      caption: 'Invest in real estate? Watch this',
      hashtags: '#investing #realestate #wealth'
    },
    {
      image: '/images/realtor-journey.jpeg',
      caption: 'Realtor journey',
      hashtags: '#realtor #career #journey'
    }
  ];

  useEffect(() => {
    // Animate likes counter
    const likesInterval = setInterval(() => {
      setLikes(prev => prev + Math.floor(Math.random() * 5));
      setFbLikes(prev => prev + Math.floor(Math.random() * 7));
    }, 2000);

    // Auto-scroll reels
    const reelInterval = setInterval(() => {
      setCurrentReelIndex(prev => (prev + 1) % instagramReels.length);
    }, 3000);

    // Animate scroll for FB
    const fbInterval = setInterval(() => {
      setScrollPositionFb(prev => (prev + 1.2) % 140);
    }, 50);

    return () => {
      clearInterval(likesInterval);
      clearInterval(reelInterval);
      clearInterval(fbInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      {/* Phone 1 - Instagram Reel Style (Foreground) */}
      <div className="relative w-[240px] h-[480px] bg-black rounded-[36px] p-2.5 shadow-2xl transform rotate-[-8deg] hover:rotate-[-5deg] transition-transform duration-300 z-20">
        <div className="w-full h-full bg-black rounded-[32px] overflow-hidden relative">
          {/* Instagram Reel */}
          <div className="absolute inset-0">
            <img 
              src={instagramReels[currentReelIndex].image}
              alt="Reel content"
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
            
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10 bg-gradient-to-r from-[#FF9933]/80 to-[#FF9933]/80">
              <div className="flex items-center gap-2">
                <img 
                  src="/images/trend loop logo .png"
                  alt="TrendLoop"
                  className="h-6 w-auto"
                />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              {/* Account Info */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src="/images/trend loop logo .png"
                    alt="TrendLoop"
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-xs">TrendLoop Media</div>
                </div>
                <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-0.5 rounded-full text-xs font-semibold border border-white/40">
                  Follow
                </button>
              </div>

              {/* Caption */}
              <p className="text-white text-xs mb-1 font-medium">
                {instagramReels[currentReelIndex].caption}
              </p>
              <p className="text-white/80 text-[10px] mb-2">
                {instagramReels[currentReelIndex].hashtags}
              </p>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-3 bottom-20 flex flex-col gap-4 items-center z-10">
              <div className="flex flex-col items-center">
                <Heart className="w-6 h-6 text-black drop-shadow-lg" />
                <span className="text-[#FF9933] text-[10px] font-semibold mt-0.5 drop-shadow-lg">{likes}K</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-6 h-6 text-black drop-shadow-lg" />
                <span className="text-[#FF9933] text-[10px] font-semibold mt-0.5 drop-shadow-lg">234</span>
              </div>
              <div className="flex flex-col items-center">
                <Send className="w-6 h-6 text-black drop-shadow-lg" />
                <span className="text-[#FF9933] text-[10px] font-semibold mt-0.5 drop-shadow-lg">89</span>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute top-0.5 left-0 right-0 flex gap-1 px-2 z-10">
              {instagramReels.map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                    idx === currentReelIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Phone 2 - Facebook Style (Background) */}
      <div className="relative w-[240px] h-[480px] bg-black rounded-[36px] p-2.5 shadow-2xl transform rotate-[8deg] hover:rotate-[5deg] transition-transform duration-300 -ml-16 z-10">
        <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
          {/* Phone Header */}
          <div className="bg-[#1877F2] p-3 flex items-center justify-between">
            <div className="text-white font-bold text-base tracking-wide">Facebook</div>
            <div className="flex gap-2">
              <MessageCircle className="w-5 h-5 text-white" />
              <ThumbsUp className="w-5 h-5 text-white" />
            </div>
          </div>
          {/* Scrolling Feed */}
          <div className="overflow-hidden h-full bg-gray-50">
            <div
              className="transition-transform duration-[900ms] ease-linear"
              style={{ transform: `translateY(-${scrollPositionFb}px)` }}
            >
              {[1,2,3,4,5,6].map(post => (
                <div key={post} className="bg-white mb-3 pt-3 px-3 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden p-0.5">
                      <img 
                        src="/images/trend loop logo .png"
                        alt="TrendLoop"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs">TrendLoop Media</div>
                      <div className="text-[10px] text-gray-500">{post * 3}m · Public</div>
                    </div>
                    <div className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF2B0] text-black font-medium border border-[#FF9933]/60">Boost</div>
                  </div>
                  <p className="text-xs text-gray-700 mb-2 leading-relaxed">Accelerating engagement across channels. Organic reach up <span className="font-semibold text-[#1877F2]">{5+post}%</span> today.</p>
                  <div className="w-full h-28 bg-gradient-to-br from-[#1877F2]/15 to-[#FF9933]/25 rounded-lg mb-2"></div>
                  <div className="flex items-center justify-between text-[10px] text-gray-600 mb-1">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-[#1877F2]" fill="#1877F2" />
                      <span className="font-medium">{(fbLikes + post*57).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{32+post} comments</span>
                      <span>{12+post} shares</span>
                    </div>
                  </div>
                  <div className="flex border-t pt-1.5 text-[#1877F2] font-medium text-[10px] justify-between">
                    <button className="flex items-center gap-1 hover:bg-[#1877F2]/10 rounded-md px-1.5 py-0.5 transition"><ThumbsUp className="w-3 h-3" />Like</button>
                    <button className="flex items-center gap-1 hover:bg-[#1877F2]/10 rounded-md px-1.5 py-0.5 transition"><MessageCircle className="w-3 h-3" />Comment</button>
                    <button className="flex items-center gap-1 hover:bg-[#1877F2]/10 rounded-md px-1.5 py-0.5 transition"><Send className="w-3 h-3" />Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Like Icon removed as requested */}
    </div>
  );
};

export default Hero;
