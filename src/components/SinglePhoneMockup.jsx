import React from 'react';

// Single phone mockup component that plays a video inside the screen
// Using local public asset path provided by user
const VIDEO_SRC = '/videos/Trendloop Ad 06.mp4';

const SinglePhoneMockup = () => {
  
  return (
    <div className="relative phone-wrapper select-none">
      {/* Outer frame - iPhone 14 Pro proportions */}
      <div className="relative w-[300px] h-[610px] md:w-[320px] md:h-[650px] rounded-[52px] bg-gradient-to-b from-gray-800 to-black shadow-2xl overflow-hidden border-[3px] border-gray-900">
        {/* Inner screen bezel - thin bezels like real iPhone */}
        <div className="absolute inset-[4px] rounded-[48px] bg-black overflow-hidden">
          {/* Dynamic Island (iPhone 14/15 Pro notch) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 mt-[6px] w-[120px] h-[32px] bg-black rounded-full shadow-lg" />
          
          {/* Screen content - video fills entire screen */}
          <div className="absolute inset-0 bg-black">
            <video
              src={VIDEO_SRC}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
            
            {/* Caption overlay */}
            {/* <div className="absolute bottom-6 left-4 right-4 text-white pointer-events-none z-10">
              <h4 className="text-sm font-semibold tracking-wide mb-1 drop-shadow-lg">Featured Reel</h4>
              <p className="text-[11px] leading-tight opacity-90 drop-shadow-md">High-impact short form content that converts attention into leads.</p>
            </div> */}
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[32px] bg-gray-800 rounded-r" />
        <div className="absolute left-[-3px] top-[170px] w-[3px] h-[58px] bg-gray-800 rounded-r" />
        <div className="absolute left-[-3px] top-[240px] w-[3px] h-[58px] bg-gray-800 rounded-r" />
        <div className="absolute right-[-3px] top-[180px] w-[3px] h-[85px] bg-gray-800 rounded-l" />
        
        {/* Subtle glass reflection */}
        <div className="pointer-events-none absolute inset-0 rounded-[52px] bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  );
};export default SinglePhoneMockup;
