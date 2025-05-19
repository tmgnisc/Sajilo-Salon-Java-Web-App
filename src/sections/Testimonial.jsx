import React from "react";

const testimonials = [
  {
    name: "Sarah K.",
    feedback:
      "Amazing service! The hairstylist understood exactly what I wanted and delivered beautifully.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James P.",
    feedback:
      "Best massage experience I’ve ever had. Friendly staff and relaxing environment.",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Mia L.",
    feedback:
      "Loved the nail care services. The team was so professional and kind.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-8 bg-pink-50 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-pink-700">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map(({ name, feedback, avatar }) => (
          <div
            key={name}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
            />
            <p className="text-gray-700 italic mb-4">"{feedback}"</p>
            <h4 className="font-semibold text-pink-700">{name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
