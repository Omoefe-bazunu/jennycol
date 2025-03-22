import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 relative">
            About Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h2>
          <img
            src="/about-us-image.jpg" // Replace with actual image path
            alt="About Us"
            className="w-full h-64 object-cover rounded-xl mb-6 border border-purple-200 shadow-md transform transition-transform duration-300 hover:scale-105"
            onError={(e) => (e.target.src = "https://via.placeholder.com/500")} // Fallback image
          />
          <p className="text-gray-700 leading-relaxed text-lg">
            Welcome to{" "}
            <span className="text-purple-800 font-semibold">
              JENNY COLLECTIONS
            </span>
            We are dedicated to providing top-notch products and services that
            enhance your lifestyle. Our commitment to quality, innovation, and
            customer satisfaction sets us apart. Join us on this journey as we
            strive to make a difference.
          </p>

          <div className="mt-8">
            <p className="text-purple-700 font-medium text-lg">
              Connect with Us
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaFacebook
                  size={32}
                  className="text-blue-600 hover:text-blue-800"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaInstagram
                  size={32}
                  className="text-pink-500 hover:text-pink-700"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaTwitter
                  size={32}
                  className="text-blue-400 hover:text-blue-600"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaLinkedin
                  size={32}
                  className="text-blue-700 hover:text-blue-900"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
