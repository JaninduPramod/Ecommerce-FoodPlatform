import { useState } from "react";
import "./App.css";
import React from "react";
import Card from "./components/Card.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
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
