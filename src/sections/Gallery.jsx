import React from "react";

const recommendedItems = [
  {
    title: "Haircut",
    description: "Trendy, classic, and personalized haircuts.",
    image: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png", // Replace with your own image URL or local path
  },
  {
    title: "Massage",
    description: "Relaxing and rejuvenating massage therapies.",
    image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
  },
  {
    title: "Nail Care",
    description: "Manicure and pedicure for perfect nails.",
    image: "https://cdn-icons-png.flaticon.com/512/2556/2556063.png",
  },
];

const Recommended = () => {
  return (
    <section className="py-16 px-8 bg-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-pink-700">
        Recommended
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {recommendedItems.map(({ title, description, image }) => (
          <div key={title} className="shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-pink-400 transition-shadow duration-300">
            <img src={image} alt={title} className="w-24 h-24 mb-6" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommended;
