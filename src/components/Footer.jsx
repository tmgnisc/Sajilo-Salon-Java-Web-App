import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Glamour Touch</h3>
          <p className="text-sm text-gray-400">
            Your beauty and wellness destination for professional hair, nail, and spa services.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Hair Styling</li>
            <li>Massage</li>
            <li>Nail Care</li>
            <li>Facials</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-sm text-gray-400">
            123 Beauty Ave,<br /> Kathmandu, Nepal<br />
            Phone: +977 9800000000<br />
            Email: contact@glamourtouch.com
          </p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Glamour Touch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
