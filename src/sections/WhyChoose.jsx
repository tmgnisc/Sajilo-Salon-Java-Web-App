import React from "react";

const ExperienceSection = () => {
  return (
    <section className="bg-[#f9f5f7] py-20 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-pink-700">
            Experience <br /> Our Services
          </h2>
          <p className="text-gray-600 max-w-md">
            We are dedicated to giving you the best salon experience, from haircuts and styling to relaxation and pampering.
          </p>
          <button className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700">
            Book Appointment
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3606/3606994.png"
            alt="Service 1"
            className="rounded-lg shadow-lg"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/3606/3606995.png"
            alt="Service 2"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
