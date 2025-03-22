import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up:", { name, email, password });
    // Optionally reset form after submission
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center relative">
            Sign Up
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-purple-700 font-medium">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-pink-500 underline hover:text-pink-600 transition-colors duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
