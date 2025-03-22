import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the best deals on high-quality products.
          </p>
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="border rounded-lg p-4 shadow-md">
              <div className="bg-gray-200 h-40 mb-4 rounded-md"></div>
              <h3 className="text-lg font-semibold">Product Name</h3>
              <p className="text-gray-600">$99.99</p>
              <Link
                to={`/products/${product}`}
                className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {["Electronics", "Clothing", "Home", "Sports"].map(
            (category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.toLowerCase()}`}
                className="block border rounded-lg p-4 shadow-md text-center hover:bg-gray-100 transition"
              >
                {category}
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
