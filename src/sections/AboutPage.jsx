import React from "react";

const About = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#4a2c39] py-16 text-white text-center">
        <h4 className="uppercase text-sm mb-2">Short Story About Us</h4>
        <h2 className="text-3xl font-bold">The big story behind our beautyness center</h2>
        <button className="mt-4 bg-pink-500 px-6 py-2 rounded hover:bg-pink-600">Contact Us</button>
      </div>

      <div className="py-12 px-6 max-w-4xl mx-auto">
        <h4 className="uppercase text-sm text-pink-600 mb-2">Our Values</h4>
        <h2 className="text-2xl font-bold mb-8">The work values we thrive for</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <img src="https://img.icons8.com/ios/50/beauty-salon.png" alt="Beauty Experts" className="w-10 h-10" />
            <div>
              <h4 className="font-bold">Beauty Experts</h4>
              <p className="text-gray-600">The majority have suffered alteration in some form.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src="https://img.icons8.com/ios/50/customer-support.png" alt="Great Services" className="w-10 h-10" />
            <div>
              <h4 className="font-bold">Great Services</h4>
              <p className="text-gray-600">Providing excellent service experience always.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src="https://img.icons8.com/ios/50/meditation-guru.png" alt="100% Authentic" className="w-10 h-10" />
            <div>
              <h4 className="font-bold">100% Authentic</h4>
              <p className="text-gray-600">Committed to originality and genuine care.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fdf3e7] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://images.unsplash.com/photo-1598214886806-d3efb732a875?auto=format&fit=crop&w=600&q=60"
            alt="About"
            className="rounded-lg shadow-lg w-full md:w-1/2"
          />
          <div>
            <h4 className="uppercase text-sm text-gray-500 mb-2">About Us</h4>
            <h2 className="text-2xl font-bold mb-4">
              It’s the bridge between service companies and consumers.
            </h2>
            <p className="text-gray-600">
              ServiceMarket.dk is a Copenhagen-based technology company known for our oneview platform. Our aim is to simplify and improve everyday life for citizens in Denmark. One platform that brings together all services in an easy and controlled environment.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">The start of the journey</h2>
        <p className="text-gray-700 mb-4">
          ServiceMarket.dk was founded in 2021 by two young entrepreneurs who saw a problem
          with the fragmented service industry in Denmark. There were thousands of small
          businesses offering services, but it was difficult for consumers to find them and know
          which ones to choose.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>The Assessment Stage:</strong> Understanding your needs and expectations</li>
          <li><strong>The Initialisation Stage:</strong> Planning and onboarding process</li>
          <li><strong>The Treatment Stage:</strong> Delivering the agreed services</li>
        </ul>
      </div>

      <div className="bg-gray-50 py-12">
        <h3 className="text-center text-2xl font-bold mb-8">What our Customers says...</h3>
        <div className="max-w-2xl mx-auto bg-[#4a2c39] text-white p-6 rounded-lg shadow-md text-center">
          <img
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="Leslie Alexander"
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <p className="italic mb-2">"Neque porro quisquam est qui dolorem..."</p>
          <h5 className="font-bold">Leslie Alexander</h5>
          <span className="text-sm">Moncton, Canada</span>
        </div>
      </div>
    </div>
  );
};

export default About;