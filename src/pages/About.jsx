import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">About Us</h2>
      <img
        src="/about-us-image.jpg" // Replace with actual image path
        alt="About Us"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 leading-relaxed">
        Welcome to [Your Business Name]! We are dedicated to providing top-notch
        products and services that enhance your lifestyle. Our commitment to
        quality, innovation, and customer satisfaction sets us apart. Join us on
        this journey as we strive to make a difference.
      </p>

      <div className="mt-6">
        <p className="text-gray-600">Connect with us:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              size={28}
              className="text-blue-600 hover:text-blue-800 transition"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={28}
              className="text-pink-500 hover:text-pink-700 transition"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              size={28}
              className="text-blue-400 hover:text-blue-600 transition"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              size={28}
              className="text-blue-700 hover:text-blue-900 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
