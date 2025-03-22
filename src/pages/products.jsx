import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Smartphone",
    category: "electronics",
    price: 299,
    originalPrice: 399,
    image: "",
  },
  {
    id: 2,
    name: "Laptop",
    category: "electronics",
    price: 899,
    originalPrice: null,
    image: "",
  },
  {
    id: 3,
    name: "Jacket",
    category: "clothing",
    price: 59,
    originalPrice: 79,
    image: "",
  },
  {
    id: 4,
    name: "Sofa",
    category: "home",
    price: 499,
    originalPrice: null,
    image: "",
  },
  {
    id: 5,
    name: "Tennis Racket",
    category: "sports",
    price: 129,
    originalPrice: 149,
    image: "",
  },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    maxPrice: 1000,
    search: "",
  });

  useEffect(() => {
    let filtered = mockProducts.filter((product) => {
      return (
        (filters.category === "all" || product.category === filters.category) &&
        product.price <= filters.maxPrice &&
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    });
    setProducts(filtered);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "category") {
      setSearchParams({ category: e.target.value });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      {/* Page Title */}
      <h2 className="text-xl font-bold text-center py-6 text-purple-800 relative">
        Our Collections
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between items-center px-6 pb-6 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-md">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <input
            type="text"
            name="search"
            placeholder="Search treasures..."
            value={filters.search}
            onChange={handleFilterChange}
            className="border-2 border-purple text-sm-200 rounded-full px-4 py-2 w-full md:w-64 focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border-2 text-sm border-purple-200 rounded-full px-4 py-2 bg-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
          </select>

          <div className="flex items-center gap-3">
            <input
              type="range"
              name="maxPrice"
              min="50"
              max="1000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-32 accent-purple-500 cursor-pointer"
            />
            <span className="text-purple-700 font-medium">
              Max: ${filters.maxPrice}
            </span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setView("grid")}
            className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
              view === "grid"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "bg-white text-purple-700 border-2 border-purple-200 hover:bg-purple-50"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
              view === "list"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "bg-white text-purple-700 border-2 border-purple-200 hover:bg-purple-50"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="flex-grow overflow-y-auto px-6 mt-8">
        <div
          className={
            view === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20"
              : "flex flex-col gap-6 pb-20"
          }
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={`group bg-white text-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 ${
                  view === "list" ? "flex gap-6 items-center" : ""
                }`}
              >
                <div
                  className={`bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300 ${
                    view === "grid" ? "h-48 mb-5" : "h-24 w-24"
                  }`}
                ></div>
                <div className={view === "list" ? "flex-1" : ""}>
                  <h3 className="text-sm font-semibold text-purple-900 mb-2">
                    {product.name}
                  </h3>
                  {product.originalPrice ? (
                    <p className="text-pink-600 font-bold">
                      ${product.price}{" "}
                      <span className="text-purple-400 line-through text-sm ml-2">
                        ${product.originalPrice}
                      </span>
                    </p>
                  ) : (
                    <p className="text-pink-600 font-bold">${product.price}</p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-purple-600 font-medium py-10">
              No products found. Try adjusting your filters!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
