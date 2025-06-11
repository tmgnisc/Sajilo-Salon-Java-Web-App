import React from 'react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen bg-gray-900 flex items-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="mb-6">
              <p className="text-gray-300 text-lg font-medium tracking-wider mb-4">
                WE ARE HERE
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                TRIM & STYLE
                <br />
                <span className="text-orange-500 text-6xl lg:text-7xl">
                  YOU
                </span>
              </h1>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              At Sajilo Salon, we are dedicated to providing exceptional grooming and styling services tailored to your unique preferences. Let's go!
            </p>
            
            <button className="bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-3 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium text-lg">
              Book Appointment
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://i.pinimg.com/736x/ba/8f/c2/ba8fc2d5848c6db415e62628829d2baa.jpg" 
                alt="Professional Barber" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              
            
              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800 to-transparent"></div>
    </section>
  );
};

export default Hero;