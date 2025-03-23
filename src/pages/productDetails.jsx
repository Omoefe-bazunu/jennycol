import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch the specific product
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = { id: productSnap.id, ...productSnap.data() };
          setProduct(productData);
          setSelectedImage(productData.images[0] || "");

          // Fetch related products
          const relatedQuery = query(
            collection(db, "products"),
            where("category", "==", productData.category),
            where("__name__", "!=", id) // Exclude the current product
          );
          const relatedSnap = await getDocs(relatedQuery);
          const related = relatedSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRelatedProducts(related);
        } else {
          setError("Product not found.");
        }

        // Load favorites from local storage
        const storedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
      } catch (err) {
        console.error("Error fetching product data: ", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleFavorite = () => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(product.id)) {
      updatedFavorites = updatedFavorites.filter(
        (favId) => favId !== product.id
      );
    } else {
      updatedFavorites.push(product.id);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <p className="text-center text-purple-600 font-medium text-xl">
          Loading...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <p className="text-center text-red-500 font-medium text-xl">
          {error || "Product not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        {/* Image Gallery */}
        <div className="w-full max-w-2xl mx-auto">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full rounded-xl border border-purple-200 shadow-lg transform transition-transform duration-300 hover:scale-105"
            onError={(e) => (e.target.src = "https://via.placeholder.com/500")} // Fallback image
          />
          <div className="flex justify-center gap-4 mt-6">
            {product.images.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-md ${
                  selectedImage === img
                    ? "border-pink-500 shadow-md"
                    : "border-purple-200"
                }`}
                onClick={() => setSelectedImage(img)}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/100")
                } // Fallback thumbnail
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full max-w-2xl mx-auto mt-8">
          <h1 className="text-2xl font-bold text-purple-900">{product.name}</h1>
          <p className="text-purple-600 mt-2 font-medium">
            Category: {product.category.toUpperCase()}
          </p>
          <p className="mt-4 text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-pink-600 font-bold mt-3">
            ${product.price.toLocaleString("en-US")}
            {product.originalPrice && (
              <span className="text-purple-400 line-through text-sm ml-2">
                ${product.originalPrice.toLocaleString("en-US")}
              </span>
            )}
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href={`https://wa.me/+2349126939069?text=I'm%20interested%20in%20your%20${encodeURIComponent(
                product.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Chat Seller
            </a>

            <button
              onClick={handleFavorite}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${
                favorites.includes(product.id)
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                  : "bg-white text-purple-700 border-2 border-purple-200 hover:bg-purple-50"
              }`}
            >
              {favorites.includes(product.id) ? (
                <IoHeart size={24} />
              ) : (
                <GoHeart size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-full max-w-2xl mx-auto mt-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6 relative">
            Customer Reviews
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h2>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 mb-4 shadow-md border border-purple-100"
              >
                <p className="text font-medium text-purple-900">
                  {review.user}
                </p>
                <p className="text-yellow-400 text">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
                <p className="text-gray-700 mt-2 text-sm">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-purple-600 font-medium">
              No reviews yet. Be the first to share your thoughts!
            </p>
          )}
        </div>

        {/* Related Products */}
        <div className="w-full max-w-2xl mx-auto mt-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6 relative">
            Related Treasures
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
                >
                  <div className="bg-gradient-to-br from-purple-200 to-pink-200 h-32 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/100")
                      }
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-900 mt-3">
                    {product.name}
                  </h3>
                  <p className="text-pink-600 font-bold">
                    ${product.price.toLocaleString("en-US")}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-purple-600 font-medium">
                No related treasures found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
