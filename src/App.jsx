import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/NavTab";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetails";
import UserProfile from "./pages/profile";
import Contact from "./pages/contact";
import AboutUs from "./pages/About";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AddProduct from "./pages/AddProduct";
import ProductManager from "./pages/ManageProducts";
import AdminPage from "./pages/AdminPanel";
// import Orders from "./pages/Orders";
// import Auth from "./pages/Auth";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/manageProduct" element={<ProductManager />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-xl mt-10">
                  404 - Page Not Found
                </h1>
              }
            />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
