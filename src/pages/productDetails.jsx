import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Smartphone",
    category: "electronics",
    description:
      "A high-quality smartphone with excellent camera and battery life.",
    price: 299,
    originalPrice: 399,
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/100?text=Side",
      "https://via.placeholder.com/100?text=Back",
      "https://via.placeholder.com/100?text=Top",
      "https://via.placeholder.com/100?text=Bottom",
    ],
    reviews: [
      { user: "Alice", rating: 5, comment: "Fantastic phone! Love it." },
      { user: "Bob", rating: 4, comment: "Great value for the price." },
    ],
  },
  {
    id: 2,
    name: "Laptop",
    category: "electronics",
    description: "A powerful laptop perfect for work and gaming.",
    price: 899,
    originalPrice: null,
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    reviews: [
      { user: "Charlie", rating: 5, comment: "Super fast and reliable!" },
      { user: "David", rating: 3, comment: "Battery life could be better." },
    ],
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);

      const related = mockProducts.filter(
        (p) => p.category === foundProduct.category && p.id !== foundProduct.id
      );
      setRelatedProducts(related);
    }

    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
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

  if (!product)
    return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="min-h-screen px-6 py-8 flex flex-col items-center">
      {/* Image Gallery */}
      <div className="w-full max-w-2xl">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full rounded-lg border shadow-lg"
        />
        <div className="flex justify-center gap-4 mt-4">
          {product.images.slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 border rounded cursor-pointer transition-transform transform hover:scale-105 ${
                selectedImage === img ? "border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full max-w-2xl mt-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.category.toUpperCase()}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="text-lg text-gray-900 font-semibold mt-2">
          ${product.price}{" "}
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">
              ${product.originalPrice}
            </span>
          )}
        </p>

        <div className="mt-4 flex gap-4">
          <a
            href={`https://wa.me/?text=I'm%20interested%20in%20your%20${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Chat Seller
          </a>

          <button
            onClick={handleFavorite}
            className={`px-6 py-2 border rounded-lg ${
              favorites.includes(product.id)
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {favorites.includes(product.id) ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border-b pb-3 mb-3">
              <p className="text-lg font-medium">{review.user}</p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Related Products */}
      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="border rounded-lg p-4 shadow-md"
              >
                <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-auto object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
