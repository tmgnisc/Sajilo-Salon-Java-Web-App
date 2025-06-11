import React from 'react';

const Packages = () => {
  const packages = [
    {
      id: 1,
      name: 'DEAL 1',
      price: '$200',
      services: [
        'Dermacos Facial',
        'Face Bleach',
        'Neck Bleach',
        'Hand Bleach',
        'Black Head Back',
        'Professional Hair Cut',
        'Quick Manicure'
      ]
    },
    {
      id: 2,
      name: 'DEAL 2',
      price: '$400',
      services: [
        'Dermacos Facial',
        'Face Bleach',
        'Neck Bleach',
        'Hand Bleach',
        'Black Head Back',
        'Professional Hair Cut',
        'Quick Manicure'
      ]
    },
    {
      id: 3,
      name: 'DEAL 3',
      price: '$500',
      services: [
        'Dermacos Facial',
        'Face Bleach',
        'Neck Bleach',
        'Hand Bleach',
        'Black Head Back',
        'Professional Hair Cut',
        'Quick Manicure'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">GROOM PACKAGES</h2>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-gray-800 border-2 border-orange-500 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Package Header */}
              <div className="text-center mb-8">
                <div className="bg-black text-white px-6 py-3 rounded mb-6">
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                </div>
                <div className="text-5xl font-bold text-orange-500 mb-2">
                  {pkg.price}
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-4 mb-8">
                {pkg.services.map((service, index) => (
                  <div key={index} className="text-gray-300 text-center">
                    {service}
                  </div>
                ))}
              </div>

              {/* Book Button */}
              <div className="text-center">
                <button className="bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-3 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium w-full">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;