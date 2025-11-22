import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ourServices } from '../data/mock';

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % ourServices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % ourServices.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + ourServices.length) % ourServices.length);
  };

  return (
    <section 
      id="services"
      className="relative py-20 bg-gradient-to-br from-white via-[#FFFBF0] to-[#FFF5E1] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-6 bg-[#FF9933]/10 px-4 py-2 rounded-full">
          <span className="text-[#FF9933] font-semibold text-lg">Our Services</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
          Comprehensive marketing services <br />
          for <span className="text-[#FF9933]">measurable growth</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From creative content to strategic campaigns, we deliver results that transform your brand presence
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="relative h-[500px] md:h-[450px] lg:h-[400px]">
          {/* Slides */}
          {ourServices.map((service, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + ourServices.length) % ourServices.length;
            const isNext = index === (currentIndex + 1) % ourServices.length;
            
            let slideClass = 'opacity-0 scale-90 translate-x-0 pointer-events-none';
            
            if (isActive) {
              slideClass = 'opacity-100 scale-100 translate-x-0 z-20';
            } else if (isPrev) {
              slideClass = 'opacity-30 scale-95 -translate-x-[60%] pointer-events-none z-10';
            } else if (isNext) {
              slideClass = 'opacity-30 scale-95 translate-x-[60%] pointer-events-none z-10';
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${slideClass}`}
              >
                <div className="h-full flex items-center justify-center px-4">
                  <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#FF9933]/10 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left Side - Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-[#FFFBF0]">
                        <div className="inline-block text-xs font-semibold text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full mb-4 w-fit">
                          Service {index + 1} of {ourServices.length}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <button className="bg-[#FF9933] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#E68A2E] transition-all hover:shadow-xl w-fit">
                          Learn More
                        </button>
                      </div>

                      {/* Right Side - Visual */}
                      <div className="relative bg-gradient-to-br from-[#FFFBF0] to-white p-8 md:p-12 flex items-center justify-center overflow-hidden">
                        {/* Subtle background decoration */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#FF9933]/10 blur-3xl"></div>
                          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-[#FF9933]/5 blur-3xl"></div>
                        </div>
                        
                        {/* Service Image - Clean and Professional */}
                        <div className="relative z-10">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-xl transition-all duration-500 hover:scale-105 hover:drop-shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-[#FF9933]/20 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all group"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-6 h-6 text-[#FF9933] group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-[#FF9933]/20 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all group"
          aria-label="Next service"
        >
          <ChevronRight className="w-6 h-6 text-[#FF9933] group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {ourServices.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-12 h-3 bg-[#FF9933]'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-[#FF9933] transition-all"
            style={{
              animation: 'progress 5s linear',
              animationIterationCount: 'infinite',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ServicesSlider;
