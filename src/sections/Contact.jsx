import React from "react";

const Contact = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#4a2c39] py-16 text-white text-center">
        <h4 className="uppercase text-sm mb-2">Get in touch with us</h4>
        <h2 className="text-3xl font-bold">We Are Ready To Assist You In 24x7</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center p-8 gap-12">
        <img
          src="https://images.unsplash.com/photo-1611691546554-d1e3acb2eb58?auto=format&fit=crop&w=600&q=60"
          alt="Salon"
          className="rounded-lg shadow-lg w-full md:w-1/2"
        />

        <div className="max-w-md">
          <h5 className="uppercase text-sm text-gray-500 mb-2">Get in Touch</h5>
          <h3 className="text-2xl font-bold mb-4">We are here to help you always...</h3>
          <p className="text-gray-600 mb-6">
            We are committed to providing excellent support and service to our customers.
            Reach out to us for any queries, appointments, or feedback.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-2">
              <img src="https://img.icons8.com/ios-filled/50/visit.png" alt="visit" className="w-6 h-6" />
              <span><strong>Visit Us:</strong> Mariendalsvej 50D 2 2000 Frederiksberg</span>
            </li>
            <li className="flex items-start gap-2">
              <img src="https://img.icons8.com/ios-filled/50/secured-letter.png" alt="email" className="w-6 h-6" />
              <span><strong>Drop Us:</strong> support@beautyness.com</span>
            </li>
            <li className="flex items-start gap-2">
              <img src="https://img.icons8.com/ios-filled/50/phone.png" alt="call" className="w-6 h-6" />
              <span><strong>Call Us:</strong> 1-800-123-9999</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#fdf3e7] py-16 px-4 text-center">
        <h5 className="uppercase text-sm text-[#c77d8a] mb-1">Schedule Your Presence</h5>
        <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
            <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
            <input type="tel" placeholder="Phone" className="w-full border p-2 rounded" />
            <input type="text" placeholder="Service You Need" className="w-full border p-2 rounded" />
            <textarea placeholder="Any Note For Us" rows="3" className="w-full border p-2 rounded"></textarea>
            <button type="submit" className="bg-[#4a2c39] text-white py-2 px-4 rounded hover:bg-[#3b1f2e]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
