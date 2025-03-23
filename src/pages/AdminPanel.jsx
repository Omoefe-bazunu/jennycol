import { useEffect, useState } from "react";
import { auth } from "./firebase";

import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (
        currentUser &&
        ["raniem57@gmail.com", "ajemigbitsejennifer@gmail.com"].includes(
          currentUser.email
        )
      ) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p className="text-red-500">Access Denied</p>;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 mt-20 flex flex-col lg:flex-row gap-6  bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Admin Dashboard
      </h2>
      <Link
        to="/manageProduct"
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:scale"
      >
        Manage Products
      </Link>
      <Link
        to="/addProduct"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </Link>
    </div>
  );
};

export default AdminPage;
