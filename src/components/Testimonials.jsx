import React from 'react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-[#FFFBF0] to-white">
      <div className="max-w-7xl mx-auto relative">
        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
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


      </div>
    </section>
  );
};

export default Testimonials;
