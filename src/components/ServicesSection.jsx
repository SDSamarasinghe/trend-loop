import React from 'react';
import { ourServices } from '../data/mock';

const ServicesSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#FFFBF0] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-black">Complete Solutions for </span>
            <span className="text-[#FF9933]">Your Brand</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive marketing services for measurable growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ourServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group border border-gray-100"
            >
              {/* Service Icon/Image */}
              <div className="mb-6 h-32 flex items-center justify-center bg-gradient-to-br from-[#FF9933]/5 to-[#FF9933]/10 rounded-xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#FF9933] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <button className="bg-[#FF9933] hover:bg-[#E68A2E] text-white font-semibold px-10 py-4 rounded-full shadow-sm hover:shadow-lg transition-all">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
