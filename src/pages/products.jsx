import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db, auth } from "./firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    maxPrice: 500000,
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null); // For pagination
  const [hasMore, setHasMore] = useState(true); // Track if more products are available
  const PAGE_SIZE = 10; // Number of products per page

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch initial products or more products
  const fetchProducts = useCallback(
    async (isLoadMore = false) => {
      setLoading(true);
      setError(null);

      try {
        // Check local storage first
        const cachedProducts = JSON.parse(
          localStorage.getItem("productsCache")
        );
        if (cachedProducts && !isLoadMore && !user) {
          setProducts(cachedProducts);
          setHasMore(false); // Assume cache has all for simplicity
          setLoading(false);
          return;
        }

        // Build Firestore query with pagination
        const productsQuery = query(
          collection(db, "products"),
          orderBy("name"), // Ensure consistent ordering (requires index in Firestore)
          limit(PAGE_SIZE),
          ...(isLoadMore && lastDoc ? [startAfter(lastDoc)] : [])
        );

        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (productsList.length < PAGE_SIZE) setHasMore(false); // No more products to load
        setLastDoc(productsSnapshot.docs[productsSnapshot.docs.length - 1]);

        setProducts((prev) =>
          isLoadMore ? [...prev, ...productsList] : productsList
        );

        // Cache initial fetch
        if (!isLoadMore) {
          localStorage.setItem("productsCache", JSON.stringify(productsList));
          const featured = productsList.filter((p) => p.featured).slice(0, 3);
          setFeaturedProducts(featured);
        }

        // Fetch user favorites if logged in
        if (user && !isLoadMore) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserFavorites(userDocSnap.data().favorites || []);
          }
        }
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [user, lastDoc]
  );

  // Initial fetch on mount or user change
  useEffect(() => {
    fetchProducts(false);
  }, [fetchProducts]);

  // Apply filters locally
  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        (filters.category === "all" || product.category === filters.category) &&
        product.price <= filters.maxPrice &&
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    });
    setProducts(filtered);
  }, [filters]);

  // Debounced filter change handler
  const handleFilterChange = debounce((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "maxPrice" ? Number(value) : value,
    }));
    if (name === "category") {
      setSearchParams({ category: value });
    }
  }, 300);

  const toggleFavorite = async (productId) => {
    if (!user) {
      alert("Please sign in to favorite products!");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      if (userFavorites.includes(productId)) {
        await updateDoc(userDocRef, { favorites: arrayRemove(productId) });
        setUserFavorites(userFavorites.filter((id) => id !== productId));
      } else {
        await updateDoc(userDocRef, { favorites: arrayUnion(productId) });
        setUserFavorites([...userFavorites, productId]);
      }
    } catch (err) {
      console.error("Error updating favorites: ", err);
      setError("Failed to update favorites. Please try again.");
    }
  };

  // Load more products when user scrolls to bottom
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      fetchProducts(true);
    }
  }, [hasMore, loading, fetchProducts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <p className="text-center text-red-500 font-medium text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <h2 className="text-4xl font-bold text-center py-6 text-purple-800 relative">
        Our Collections
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between items-center px-6 py-6 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-md">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <input
            type="text"
            name="search"
            placeholder="Search treasures..."
            defaultValue={filters.search}
            onChange={handleFilterChange}
            className="border-2 text-sm border-purple-200 rounded-full px-4 py-2 w-full md:w-64 focus:outline-none focus:border-purple-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border-2 text-sm border-purple-200 rounded-full px-4 py-2 bg-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300 text-purple-900"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
          </select>
          <div className="flex items-center gap-3">
            <input
              type="range"
              name="maxPrice"
              min="5000"
              max="500000"
              step="5000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-32 accent-purple-500 cursor-pointer"
            />
            <span className="text-purple-700 font-medium">
              Max: ₦{filters.maxPrice.toLocaleString("en-NG")}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setView("grid")}
            className={`px-5 text-sm py-2 rounded-full transition-all duration-300 ${
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
              <div
                key={product.id}
                className={`group bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 ${
                  view === "list" ? "flex gap-6 items-center" : ""
                }`}
              >
                <Link to={`/products/${product.id}`} className="flex-1">
                  <div
                    className={`bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300 ${
                      view === "grid" ? "h-48 mb-5" : "h-24 w-24"
                    }`}
                  >
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/100"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/100")
                      }
                    />
                  </div>
                  <div className={view === "list" ? "flex-1" : ""}>
                    <h3 className="text-xl font-semibold text-purple-900 mb-2">
                      {product.name}
                    </h3>
                    {product.originalPrice ? (
                      <p className="text-pink-600 font-bold">
                        ₦{product.price.toLocaleString("en-NG")}{" "}
                        <span className="text-purple-400 line-through text-sm ml-2">
                          ₦{product.originalPrice.toLocaleString("en-NG")}
                        </span>
                      </p>
                    ) : (
                      <p className="text-pink-600 font-bold">
                        ₦{product.price.toLocaleString("en-NG")}
                      </p>
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="p-2 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  {userFavorites.includes(product.id) ? (
                    <IoHeart size={24} className="text-red-500" />
                  ) : (
                    <IoHeartOutline size={24} className="text-purple-700" />
                  )}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-purple-600 font-medium py-10">
              No products found. Try adjusting your filters!
            </p>
          )}
        </div>
        {loading && (
          <div className="flex justify-center py-6">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-center text-purple-600 font-medium py-10">
            No more products to load.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
