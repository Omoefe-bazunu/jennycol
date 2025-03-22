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
    <div className="min-h-screen flex flex-col">
      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-center py-4">Products</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between items-center px-6 pb-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full md:w-64"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="range"
              name="maxPrice"
              min="50"
              max="1000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="cursor-pointer"
            />
            <span className="text-gray-700">Max: ${filters.maxPrice}</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 ${
              view === "grid" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 ${
              view === "list" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="flex-grow overflow-auto px-6 pb-20">
        <div
          className={
            view === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={`border rounded-lg p-4 shadow-md ${
                  view === "list" ? "flex gap-4 items-center" : ""
                }`}
              >
                <div
                  className={`bg-gray-200 ${
                    view === "grid" ? "h-40" : "h-24 w-24"
                  } rounded-md`}
                ></div>
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  {product.originalPrice ? (
                    <p className="text-red-600 font-bold">
                      ${product.price}{" "}
                      <span className="text-gray-500 line-through text-sm ml-2">
                        ${product.originalPrice}
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-600">${product.price}</p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
