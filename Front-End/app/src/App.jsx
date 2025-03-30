<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> 98d6fdea647f648bba00ef4e32cb21fd8dcd5086
import "./App.css";
import React from "react";
import Card from "./components/Card.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Onboarding from "./pages/onboarding";
import AuthSection from "./pages/Login.jsx";
import Admin from "./pages/AdminPage.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
// import ProductCard from "./Test/ProductCard/ProductCard.jsx";
// import ProductSetup from "./Test/ProductSetup.jsx";

function App() {
  return (
    // <div className="app">
    //     <HomePage />
    //
    //
    // </div>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/login" element={<AuthSection />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
=======
import img from "./assets/img1.jpg";


function App() {
  const [count, setCount] = useState(0)

    return (
        <div className="app">
            <HomePage /> 
             <ProductPage />  
            <Footer /> 
        </div>
        
    );
}

export default App
>>>>>>> 98d6fdea647f648bba00ef4e32cb21fd8dcd5086
