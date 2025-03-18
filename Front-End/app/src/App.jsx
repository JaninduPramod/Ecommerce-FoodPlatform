import { useState } from "react";
import "./App.css";
import React from "react";
import Card from "./components/Card.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./mainPages/Home.jsx";
import img from "./assets/img1.jpg";


function App() {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handleAddToCart = () => {
        alert(`Added ${quantity} item(s) to the cart`);
        // You can add more logic here, like updating a global state or making an API call
    };

    return (
        <div className="app">
            <HomePage />
            <Card
                
                state="sold out"
                image= {img} 
                title="Organic Fruits"
                description="Kitchen Spices - Fregfdgfdgsh And Healthy"
                price={904.00}
                options={["3 kg", "7 kg"]}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
            />
            <Footer />
        </div>
        
    );
}

export default App;