import "./App.css";
import React from "react";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Onboarding from "./pages/onboarding";


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
        </Routes>
        <Footer /> 
      </Router>
        
    );
}

export default App;