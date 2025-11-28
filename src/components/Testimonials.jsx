import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const cardsPerView = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * cardsPerView;
    return testimonials.slice(start, start + cardsPerView);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 px-6 bg-gradient-to-b from-[#FFFBF0] to-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-6 bg-[#FF9933]/10 px-4 py-2 rounded-full">
          <span className="text-[#FF9933] font-semibold text-lg">Testimonials</span>
        </div>
        <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-4 text-black">
          What Our Clients <span className="text-[#FF9933]">Say About Us</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real feedback from real clients who trusted us with their brand growth
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[380px]">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-orange-100 flex flex-col animate-fadeIn"
                style={{ boxShadow: '0 8px 32px 0 rgba(255, 123, 0, 0.08)' }}
              >
                {/* Stylized quotation marks */}
                <div className="flex items-start justify-start mb-2">
                  <span className="text-3xl text-orange-400 font-serif font-bold opacity-60 select-none">"</span>
                </div>
                
                {/* Quote Text */}
                <p className="relative text-gray-800 text-[1rem] mb-6 leading-relaxed font-medium px-2 flex-grow">
                  {testimonial.quote.split('**').map((part, i) =>
                    i % 2 === 1 ? <strong key={i} className="text-orange-500">{part}</strong> : part
                  )}
                  <span className="absolute -bottom-6 right-2 text-3xl text-orange-400 font-serif font-bold opacity-60 select-none">"</span>
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-14 h-14 rounded-full border-2 border-orange-500 bg-orange-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-black text-base leading-tight mb-1">{testimonial.author}</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs font-medium">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-[#FF9933]/20 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-[#FF9933] group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-[#FF9933]/20 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-[#FF9933] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-[#FF9933]'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        {isAutoPlaying && (
          <div className="absolute -bottom-8 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-full bg-[#FF9933] transition-all"
              style={{
                animation: 'progress 5s linear',
                animationIterationCount: 'infinite',
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
