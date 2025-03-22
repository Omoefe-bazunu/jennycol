import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Smartphone",
    price: 299,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Laptop",
    price: 899,
    image: "https://via.placeholder.com/100",
  },
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(mockProducts.filter((p) => storedFavorites.includes(p.id)));
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((p) => p.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites.map((p) => p.id))
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem("favorites");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 relative">
            Your Profile
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h2>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
            <p className="text-xl font-semibold text-purple-800">{user.name}</p>
            <p className="text-purple-600 mt-1">{user.email}</p>
          </div>

          <h3 className="text-2xl font-semibold text-purple-800 mt-8 mb-4 relative">
            Favorite Products
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h3>
          {favorites.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {favorites.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-purple-100 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-purple-200"
                    />
                    <div>
                      <p className="font-semibold text-purple-900">
                        {product.name}
                      </p>
                      <p className="text-pink-600 font-bold">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="text-white bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-purple-600 font-medium mt-2">
              No favorite products yet. Start exploring!
            </p>
          )}

          <button
            onClick={handleSignOut}
            className="mt-8 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
