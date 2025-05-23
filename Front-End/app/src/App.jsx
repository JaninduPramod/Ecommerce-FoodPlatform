import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/navbar";
import ProductPage from "./pages/ProductPage.jsx";
import Onboarding from "./pages/onboarding";
import AuthSection from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import SupplierProfile from "./pages/SupplierProfile.jsx";
import Admin from "./pages/Admin.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import OrdersPage from "./pages/Orders.jsx";
import SupplierProducts from "./pages/SupplierProducts";
import SupProfile from "./pages/SupProfile.jsx";

const AppLayout = () => {
  const location = useLocation();

  const hideLayout = ["/", "/signup", "/checkout", "/supplierPage", "/my-products", "/sup-prof"];
  const shouldHideLayout = hideLayout.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <NavBar />}
      <Routes>
        <Route path="/" element={<AuthSection />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/supplierPage" element={<SupplierProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/productManagement" element={<ProductManagement />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/my-products" element={<SupplierProducts />} />
        <Route path="/sup-prof" element={<SupProfile />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;