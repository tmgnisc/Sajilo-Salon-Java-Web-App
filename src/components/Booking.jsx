import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    barber: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking submitted:', formData);
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">BOOK APPOINTMENT</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <div className="text-white">
            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <Phone className="text-orange-500 w-6 h-6" />
                <span className="text-lg">+1 233 898 0897</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-orange-500 w-6 h-6" />
                <span className="text-lg">email@example.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-orange-500 w-6 h-6" />
                <span className="text-lg">123 Main Street, Anytown, USA.</span>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6">OPENING HOURS</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Mon–Fri</span>
                  <span className="text-orange-500 font-bold text-lg">9 AM – 7 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Sat–Sun</span>
                  <span className="text-orange-500 font-bold text-lg">9 AM – 5 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-400 py-3 focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-400 py-3 focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-400 py-3 focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-400 py-3 focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-600 text-white py-3 focus:border-orange-500 focus:outline-none transition-colors appearance-none"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Service</option>
                    <option value="haircut" className="bg-gray-800">Hair Cut</option>
                    <option value="styling" className="bg-gray-800">Hair Styling</option>
                    <option value="beard" className="bg-gray-800">Beard Trim</option>
                    <option value="wash" className="bg-gray-800">Hair Wash</option>
                  </select>
                </div>
                <div>
                  <select
                    name="barber"
                    value={formData.barber}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-gray-600 text-white py-3 focus:border-orange-500 focus:outline-none transition-colors appearance-none"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Barber</option>
                    <option value="john" className="bg-gray-800">John Smith</option>
                    <option value="mike" className="bg-gray-800">Mike Johnson</option>
                    <option value="david" className="bg-gray-800">David Wilson</option>
                  </select>
                </div>
              </div>

              <div className="text-center pt-8">
                <button
                  type="submit"
                  className="bg-transparent border-2 border-orange-500 text-orange-500 px-12 py-4 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium text-lg"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;