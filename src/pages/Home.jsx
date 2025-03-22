import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-30 bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-down tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300">
              JENNY COLLECTIONS
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light animate-fade-in-up">
            Unveil the Magic of Premium Shopping
          </p>
          <Link
            to="/products"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-10 text-purple-800 relative">
          Featured Products
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((product) => (
            <div
              key={product}
              className="group bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
            >
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 h-48 mb-5 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300"></div>
              <h3 className=" font-semibold text-purple-900 mb-2">
                Product Name
              </h3>
              <p className="text-pink-600 font-medium mb-4">$99.99</p>
              <Link
                to={`/products/${product}`}
                className="inline-block text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full transition-all duration-300 transform group-hover:scale-105"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-10 text-purple-800 relative">
          Explore Categories
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {["Electronics", "Clothing", "Home", "Sports"].map(
            (category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.toLowerCase()}`}
                className="group block bg-white rounded-xl p-6 shadow-md text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-purple-100"
              >
                <span className=" font-semibold text-purple-700 group-hover:text-pink-500 transition-colors duration-300">
                  {category}
                </span>
                <div className="mt-2 w-0 h-0.5 bg-pink-500 mx-auto transition-all duration-300 group-hover:w-12"></div>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
