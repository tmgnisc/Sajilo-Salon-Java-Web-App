import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-8">ABOUT US</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              At Sajilo Sewa, we are dedicated to providing exceptional grooming and styling services tailored to your unique preferences. Step into our modern and inviting space, where our skilled barbers combine their expertise with the latest techniques to deliver top-notch results.
            </p>

            {/* History Section */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6">HISTORY</h3>
              <div className="flex items-start space-x-6">
                <div className="text-6xl font-bold text-orange-500 leading-none">
                  1995
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Established in 1995, Sajilo Sewa has been a trusted destination for exceptional grooming and styling services for over two decades. With a rich history rooted in the art of barbering, we have cultivated a reputation for delivering top-quality results and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>

            <button className="bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-3 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium">
              Learn More
            </button>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Barber Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop" 
                alt="Professional Barber at Work" 
                className="w-full h-80 object-cover rounded-lg shadow-xl"
              />
            </div>

            {/* Opening Hours */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">OPENING HOURS</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Mon–Fri</span>
                  <div className="flex-1 border-b border-dotted border-gray-600 mx-4"></div>
                  <span className="text-orange-500 font-bold text-lg">9 AM – 7 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Sat–Sun</span>
                  <div className="flex-1 border-b border-dotted border-gray-600 mx-4"></div>
                  <span className="text-orange-500 font-bold text-lg">9 AM – 5 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;