import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (send email, save to database, etc.)
    console.log("Form Data:", formData);
    // Optionally reset form after submission
    setFormData({ name: "", email: "", whatsapp: "", message: "" });
  };

  const clientWhatsAppNumber = "+2349012345678"; // Replace with actual WhatsApp number

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center relative">
            Get in Touch
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300 h-32 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Send Message
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-purple-700 font-medium">
              Or connect with us instantly
            </p>
            <a
              href={`https://wa.me/${clientWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full mt-3 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
