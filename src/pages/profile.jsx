import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDataAndFavorites = async () => {
      if (user) {
        setLoading(true);
        setError(null);

        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData(data);

            // Fetch favorite products from Firestore based on favorites array
            const favoriteIds = data.favorites || [];
            if (favoriteIds.length > 0) {
              const favoritePromises = favoriteIds.map(async (id) => {
                const productDocRef = doc(db, "products", id);
                const productDocSnap = await getDoc(productDocRef);
                return productDocSnap.exists()
                  ? { id, ...productDocSnap.data() }
                  : null;
              });
              const favoriteProducts = (
                await Promise.all(favoritePromises)
              ).filter(Boolean);
              setFavorites(favoriteProducts);
            }
          } else {
            setUserData({
              name: user.displayName || "User",
              email: user.email,
            });
          }
        } catch (err) {
          console.error("Error fetching user data or favorites: ", err);
          setError("Failed to load profile data. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    if (!loadingAuth && !user) {
      navigate("/signin"); // Redirect to sign-in if not authenticated
    } else if (!loadingAuth) {
      fetchUserDataAndFavorites();
    }
  }, [user, loadingAuth, navigate]);

  const removeFavorite = async (productId) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(productId),
      });
      setFavorites(favorites.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Error removing favorite: ", err);
      setError("Failed to remove favorite. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (err) {
      console.error("Error signing out: ", err);
      setError("Failed to sign out. Please try again.");
    }
  };

  if (loadingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorAuth || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <p className="text-center text-red-500 font-medium text-xl">
          {error || "Authentication error. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 pb-20">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-purple-100">
          <h2 className="text-xl text-center font-bold text-purple-900 mb-6 relative">
            Your Profile
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-18 h-1 bg-gradient-to-r from-purple-500 to-indig0-500 rounded-full"></span>
          </h2>
          <div className="bg-purple-600 p-4 rounded-lg text-center">
            <p className="text-xl font-semibold text-white">
              {userData?.name || "User"}
            </p>
            <p className="text-white mt-1">{userData?.email || user.email}</p>
          </div>

          <h3 className="text-lg font-semibold text-purple-800 mt-8 mb-4 relative">
            Favorite Treasures
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
          </h3>
          {favorites.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {favorites.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-purple-100 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/100"
                      }
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-purple-200"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/100")
                      }
                    />
                    <div>
                      <p className="font-semibold text-purple-900 text-sm">
                        {product.name}
                      </p>
                      <p className="text-pink-600 font-bold text-sm">
                        ₦{product.price.toLocaleString("en-NG")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="text-white text-sm bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-purple-600 font-medium mt-2 text-sm">
              No favorite treasures yet. Start exploring!
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
