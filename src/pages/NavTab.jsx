import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaUser,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around py-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <FaHome size={24} />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <FaThLarge size={24} />
        <span className="text-xs">All Products</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <FaUser size={24} />
        <span className="text-xs">Profile</span>
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <FaInfoCircle size={24} />
        <span className="text-xs">About Us</span>
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`
        }
      >
        <FaPhone size={24} />
        <span className="text-xs">Contact</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
