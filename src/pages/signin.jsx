import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In:", { email, password });
    // Optionally reset form after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-6 text-center relative">
            Sign In
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-18 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-sm px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-sm px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Sign In
            </button>
          </form>
          <p className="text-center mt-6 text-indigo-600 font-medium">
            No account?{" "}
            <Link
              to="/signup"
              className="text-purple-700 underline hover:text-pink-600 transition-colors duration-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
