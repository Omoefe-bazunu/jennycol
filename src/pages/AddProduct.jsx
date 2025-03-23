import { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const categories = ["electronics", "fashion", "home", "beauty", "sports"];

const AddProduct = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "electronics",
    description: "",
    price: "",
    originalPrice: "",
    images: [], // Will store uploaded image URLs
    reviews: [], // Array of review objects
  });
  const [imageFiles, setImageFiles] = useState([]); // Temporary storage for image files
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 5,
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "originalPrice" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }
    setImageFiles(files);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const addReview = () => {
    if (!newReview.user || !newReview.comment) {
      setError("Please fill in all review fields.");
      return;
    }
    setProduct((prev) => ({
      ...prev,
      reviews: [...prev.reviews, { ...newReview }],
    }));
    setNewReview({ user: "", rating: 5, comment: "" });
  };

  const removeReview = (index) => {
    setProduct((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Upload images to Firebase Storage
      const imageUrls = await Promise.all(
        imageFiles.map(async (file, index) => {
          const storageRef = ref(
            storage,
            `products/${Date.now()}_${index}_${file.name}`
          );
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );

      const productData = {
        ...product,
        images: imageUrls,
        price: product.price ? Number(product.price) : 0,
        originalPrice: product.originalPrice
          ? Number(product.originalPrice)
          : null,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", docRef.id);

      if (onAddProduct) {
        onAddProduct({ ...productData, id: docRef.id });
      }

      // Reset form
      setProduct({
        name: "",
        category: "electronics",
        description: "",
        price: "",
        originalPrice: "",
        images: [],
        reviews: [],
      });
      setImageFiles([]);
      setNewReview({ user: "", rating: 5, comment: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      console.error("Error adding product: ", err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-6 text-center relative">
            Add New Product
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              required
            />
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300 h-32 resize-none"
              required
            ></textarea>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
              placeholder="Original Price (optional)"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300"
              min="0"
              step="0.01"
            />
            <div>
              <h3 className="text font-semibold text-purple-800 mb-3">
                Upload Product Images (up to 5)
              </h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900"
              />
              {imageFiles.length > 0 && (
                <p className="text-purple-600 mt-2">
                  {imageFiles.length} image(s) selected
                </p>
              )}
            </div>
            <div>
              <h3 className="text font-semibold text-purple-800 mb-3">
                Add Reviews (optional)
              </h3>
              <input
                type="text"
                name="user"
                value={newReview.user}
                onChange={handleReviewChange}
                placeholder="Reviewer Name"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300 mb-2"
              />
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 mb-2"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                placeholder="Review Comment"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-pink-400 transition-colors duration-300 bg-white/50 text-purple-900 placeholder-purple-300 h-24 resize-none mb-2"
              ></textarea>
              <button
                type="button"
                onClick={addReview}
                className="w-full text-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Add Review
              </button>
              {product.reviews.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {product.reviews.map((review, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-purple-50 p-3 rounded-lg border border-purple-200"
                    >
                      <div>
                        <p className="text-purple-900 font-medium">
                          {review.user} - {review.rating} ★
                        </p>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                      <button
                        onClick={() => removeReview(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full text-white transition-all duration-300 transform hover:scale-105 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r text-lg from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              {loading ? "Adding..." : "Add Product after Review"}
            </button>
          </form>
          {success && (
            <p className="text-center mt-4 text-green-600 font-medium">
              Product added successfully!
            </p>
          )}
          {error && (
            <p className="text-center mt-4 text-red-500 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
