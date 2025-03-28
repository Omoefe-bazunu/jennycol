import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaUser,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth } from "./firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl border-t border-purple-400/30 flex justify-around py-3 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
            isActive
              ? "text-yellow-300 scale-110"
              : "text-white hover:text-yellow-200"
          }`
        }
      >
        <FaHome size={20} className="mb-1" />
        <span className="text-xs font-medium">Home</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
            isActive
              ? "text-yellow-300 scale-110"
              : "text-white hover:text-yellow-200"
          }`
        }
      >
        <FaThLarge size={20} className="mb-1" />
        <span className="text-xs font-medium">Products</span>
      </NavLink>

      <NavLink
        to={isAuthenticated ? "/profile" : "/signin"}
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
            isActive
              ? "text-yellow-300 scale-110"
              : "text-white hover:text-yellow-200"
          }`
        }
      >
        <FaUser size={20} className="mb-1" />
        <span className="text-xs font-medium">
          {isAuthenticated ? "Profile" : "Login"}
        </span>
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
            isActive
              ? "text-yellow-300 scale-110"
              : "text-white hover:text-yellow-200"
          }`
        }
      >
        <FaInfoCircle size={20} className="mb-1" />
        <span className="text-xs font-medium">About</span>
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
            isActive
              ? "text-yellow-300 scale-110"
              : "text-white hover:text-yellow-200"
          }`
        }
      >
        <FaPhone size={20} className="mb-1" />
        <span className="text-xs font-medium">Contact</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
