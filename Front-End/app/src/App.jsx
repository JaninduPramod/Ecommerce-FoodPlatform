import { useState } from "react";
import "./App.css";
import React from "react";
import Card from "./components/Card.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./mainPages/Home.jsx";
import ProductPage from "./mainPages/ProductPage.jsx";
import img from "./assets/img1.jpg";


function App() {
  

    return (
        <div className="app">
            <HomePage />
            <ProductPage />
            <Footer />
        </div>
        
    );
}

export default App;