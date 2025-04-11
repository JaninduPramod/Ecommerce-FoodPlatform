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
// import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Onboarding from "./pages/onboarding";
import AuthSection from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

const AppLayout = () => {
  const location = useLocation();

  const hideLayout = ["/", "/signup", "/checkout"];
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
