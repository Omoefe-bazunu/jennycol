import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, { displayName: name });

      // Store additional user data in Firestore, including favorites array
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        favorites: [], // Initialize empty favorites array
      });

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/products"); // Redirect to products page after signup
      }, 2000); // Show success message for 2 seconds
    } catch (err) {
      console.error("Error signing up: ", err);
      setError(err.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-6 text-center relative">
            Sign Up
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-18 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 text-sm border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-sm border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-sm border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full text-white transition-all duration-300 transform hover:scale-105 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {success && (
            <p className="text-center mt-4 text-green-600 font-medium">
              Account created successfully! Redirecting...
            </p>
          )}
          {error && (
            <p className="text-center mt-4 text-red-500 font-medium">{error}</p>
          )}
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
