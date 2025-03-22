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
    <div className="min-h-screen px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p className="text-lg font-medium">{user.name}</p>
        <p className="text-gray-600">{user.email}</p>

        <h3 className="text-xl font-semibold mt-6">Favorites</h3>
        {favorites.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {favorites.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-500">${product.price}</p>
                </div>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No favorite items yet.</p>
        )}

        <button
          onClick={handleSignOut}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
