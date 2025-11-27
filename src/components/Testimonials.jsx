import React from 'react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  // Duplicate testimonials for infinite scroll effect
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-[#FFFBF0] to-white">
      <div className="max-w-7xl mx-auto relative">
        {/* Professional auto-scrolling testimonial carousel */}
        <div className="relative w-full">
          <div
            className="flex gap-6 mb-16 pb-4 animate-testimonial-scroll"
            style={{
              width: 'max-content',
              animation: `testimonial-scroll ${testimonials.length * 6}s linear infinite` // 6s per card
            }}
          >
            {allTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id + '-' + index}
                className="min-w-[340px] max-w-xs bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 flex-shrink-0 snap-center border border-orange-100 relative"
                style={{ boxShadow: '0 8px 32px 0 rgba(255, 123, 0, 0.08)' }}
              >
                {/* Stylized quotation marks around statement */}
                <div className="flex items-start justify-start mb-2">
                  <span className="text-3xl text-orange-400 font-serif font-bold opacity-60 select-none">“</span>
                </div>
                <p className="relative text-gray-800 text-[1.1rem] mb-6 leading-relaxed font-medium px-2">
                  {testimonial.quote.split('**').map((part, i) =>
                    i % 2 === 1 ? <strong key={i} className="text-orange-500">{part}</strong> : part
                  )}
                  <span className="absolute -bottom-6 right-2 text-3xl text-orange-400 font-serif font-bold opacity-60 select-none">”</span>
                </p>
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-14 h-14 rounded-full border-2 border-orange-500 bg-orange-50 flex items-center justify-center overflow-hidden">
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
          <style>{`
            @keyframes testimonial-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-testimonial-scroll::-webkit-scrollbar { display: none; }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
