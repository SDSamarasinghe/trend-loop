import React, { useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { reelsPortfolio } from '../data/mock';

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasError) {
            videoRef.current?.play().catch(() => {
              // Silently handle autoplay errors
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [hasError]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
      style={{ aspectRatio: '9/16' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!hasError && reel.video ? (
        <video
          ref={videoRef}
          src={reel.video}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onError={handleVideoError}
        />
      ) : reel.thumbnail ? (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-16 h-16 text-gray-400" />
        </div>
      )}
      
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>

      {/* Controls overlay */}
      <div className={`absolute inset-0 flex flex-col justify-between p-5 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        {!hasError && reel.video && (
          <div className="flex justify-end">
            <button
              onClick={toggleMute}
              className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          {reel.title && (
            <h3 className="font-bold text-white text-lg drop-shadow-lg">
              {reel.title}
            </h3>
          )}
          <span className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            Reel #{reel.id}
          </span>
        </div>
      </div>
    </div>
  );
};

const ReelsPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = [
    'All',
    'Automotive',
    'Real Estate',
    'Saloon & Barber',
    'Restaurant',
    'Lifestyle',
    'Cinematic'
  ];

  const filteredReels = selectedCategory === 'All'
    ? reelsPortfolio
    : reelsPortfolio.filter(reel => reel.category === selectedCategory);

  return (
    <section id="work" className="py-24 px-6 bg-gradient-to-b from-white to-[#FFFBF0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-black">Our </span>
            <span className="bg-gradient-to-r from-[#FF9933] to-[#FF9933] bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            your brand & our creative touch built for social media.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-[#FF9933] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Reels Grid - Clean 9:16 Format */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredReels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button className="bg-[#FF9933] hover:bg-[#E68A2E] text-white font-semibold px-10 py-4 rounded-full shadow-sm hover:shadow-lg transition">
            View full portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReelsPortfolio;
