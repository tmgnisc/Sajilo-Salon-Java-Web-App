import React from "react";
import heroImage from "../assets/hero-image.png";

const Hero = () => {
  return (
    <section className="relative bg-pink-100">
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
        {/* Hero Text */}
        <div>
          <p className="uppercase text-sm tracking-widest text-pink-600 font-medium">
            Hair Salon, Masseuse, Beauty Salon
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-4">
            Find a service<br /> close to you
          </h1>
          <p className="mt-4 text-gray-700 max-w-md">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
          </p>

          {/* Search Bar */}
          <div className="mt-6 bg-white p-4 rounded shadow-md flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Book your services..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Where..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded w-full"
            />
            <button className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 w-full md:w-auto">
              Search
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden md:block">
          <img
            src={heroImage}
            alt="Hair stylist"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;