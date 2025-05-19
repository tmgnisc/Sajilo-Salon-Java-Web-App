import React from "react";
import heroImage from "../assets/hero-image.png";

const services = [
  {
    id: 1,
    title: "Hair Salon",
    description: "Expert haircuts, styling, and coloring for all hair types.",
    imageUrl: heroImage,
  },
  {
    id: 2,
    title: "Masseuse",
    description: "Relaxing and therapeutic massage services tailored to your needs.",
    imageUrl: heroImage,
  },
  {
    id: 3,
    title: "Beauty Salon",
    description: "Professional skincare, makeup, and beauty treatments.",
    imageUrl: heroImage,
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-pink-50 rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-pink-700">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
