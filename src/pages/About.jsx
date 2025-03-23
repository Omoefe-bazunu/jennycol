import { FaFacebook, FaInstagram, FaTelegramPlane } from "react-icons/fa"; //
// import { FaXTwitter } from "react-icons/fa6";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100 text-center">
          <h2 className="text-xl font-bold text-purple-900 mb-6 relative">
            About Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-18 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
          </h2>
          <img
            src="bg.jpg" // Main image
            alt="About Us"
            className="w-full h-64 object-cover rounded-xl my-6 border border-purple-200 shadow-md transform transition-transform duration-300 hover:scale-105"
            onError={(e) => (e.target.src = "q2.jpg")} // Fallback image
          />
          <p className="text-gray-700 leading-relaxed">
            Welcome to{" "}
            <span className="text-purple-800 font-semibold">
              JENNY COLLECTIONS!{" "}
            </span>
            We are dedicated to providing top-notch products and services that
            enhance your lifestyle. Our commitment to quality, innovation, and
            customer satisfaction sets us apart. Join us on this journey as we
            strive to make a difference.
          </p>

          <div className="mt-8 border-t border-purple-500 pt-4">
            <p className="text-purple-700 font-medium">Connect with Us</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=100076189577070"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaFacebook
                  size={20}
                  className="text-blue-600 hover:text-blue-800"
                />
              </a>
              <a
                href="https://www.instagram.com/jen_nystores/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaInstagram
                  size={20}
                  className="text-pink-500 hover:text-pink-700"
                />
              </a>
              {/* <a
                href="https://x.com" // X link
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaXTwitter
                  size={20}
                  className="text-black hover:text-gray-700"
                />
              </a> */}
              <a
                href="https://t.me/yourTelegram" // Replace with your Telegram link
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-125"
              >
                <FaTelegramPlane
                  size={20}
                  className="text-blue-500 hover:text-blue-700"
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
