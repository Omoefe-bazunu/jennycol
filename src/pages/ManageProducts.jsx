import { useEffect, useState } from "react";
import { db, storage } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteDoc(doc(db, "products", id));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleEdit = async (id, updatedDetails) => {
    try {
      await updateDoc(doc(db, "products", id), updatedDetails);
      setProducts(
        products.map((p) => (p.id === id ? { ...p, ...updatedDetails } : p))
      );
      setEditing(null);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-900">
        Manage Products
      </h2>
      {selectedProducts.map((product) => (
        <div key={product.id} className="bg-white p-4 mb-4 shadow ">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(product.id)}
          >
            <h3 className="text-xl text-purple-900 font-bold">
              {product.name}
            </h3>
            <span>{expanded === product.id ? "▲" : "▼"}</span>
          </div>
          {expanded === product.id && (
            <div className="mt-3">
              {editing === product.id ? (
                <div>
                  <textarea
                    defaultValue={product.description}
                    id={`description-${product.id}`}
                    className="w-full p-2 border rounded mb-2 text-purple-900"
                  />
                  <input
                    type="number"
                    defaultValue={product.price}
                    id={`price-${product.id}`}
                    className="w-full p-2 border rounded mb-4 text-purple-900 "
                  />
                  <button
                    onClick={() =>
                      handleEdit(product.id, {
                        description: document.getElementById(
                          `description-${product.id}`
                        ).value,
                        price: document.getElementById(`price-${product.id}`)
                          .value,
                      })
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer "
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="ml-2 text-gray-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-purple-900">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p className="text-purple-900">
                    <strong>Price:</strong> ₦{product.price}
                  </p>
                  <button
                    onClick={() => setEditing(product.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.imageUrl)}
                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mt-4"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManager;
