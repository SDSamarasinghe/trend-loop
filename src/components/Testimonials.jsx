import React from 'react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-white relative">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 transform"
              style={{
                transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`,
              }}
            >
              <p className="text-gray-800 text-lg mb-4 leading-relaxed">
                {testimonial.quote.split('**').map((part, i) => 
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                )}
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-black">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 max-w-5xl mx-auto mt-4">
          <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl">
            <span className="text-black">Everything you need to start sending </span>
            <span className="bg-gradient-to-r from-[#FFD000] to-[#FFEA00] bg-clip-text text-transparent">drip campaigns</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Turn attention into loyal audiences. Strategic creative, data-driven optimization, and consistent execution—wrapped in one monthly subscription.
          </p>
          <div className="flex justify-center">
            <button className="bg-[#FFD000] hover:bg-[#FFEA00] text-black font-semibold px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
              See how we do it
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
