import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'HAIR STYLING',
      image: 'https://i.pinimg.com/736x/d5/6c/f0/d56cf0fcadc18ebdd0956f86a115f41e.jpg'
    },
    {
      id: 2,
      name: 'HAIR CUT',
      image: 'https://i.pinimg.com/736x/73/22/fd/7322fdf87253321f009c9101f203dc81.jpg'
    },
    {
      id: 3,
      name: 'BEARD TRIM',
      image: 'https://i.pinimg.com/736x/b1/74/4a/b1744ae501b3e3226eb597fb4a0c5ca9.jpg'
    },
    {
      id: 4,
      name: 'HAIR WASH',
      image: 'https://i.pinimg.com/736x/13/3c/3f/133c3f44ab59c1783ffad91fea26320c.jpg'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">SERVICES</h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div key={service.id} className="relative group overflow-hidden rounded-lg">
              <div className="aspect-square relative">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                
                {/* Service Name */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold tracking-wider transform -rotate-90 group-hover:rotate-0 transition-transform duration-300">
                    {service.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-black/30 rounded-lg p-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">25+</div>
            <div className="text-gray-300 text-sm md:text-base">Years of Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-300 text-sm md:text-base">Services Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">21</div>
            <div className="text-gray-300 text-sm md:text-base">Experienced Staff</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1220+</div>
            <div className="text-gray-300 text-sm md:text-base">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;