import React, { useState, useEffect } from "react";
import "./Home.css"; // Custom CSS for the carousel
import img from "../assets/v_image.png";
import img1 from "../assets/v_image1.png";
import img2 from "../assets/v_image2.png";
import CardImg2 from "../assets/img4.png";
import CardImg from "../assets/img1.jpg";
import Card from "../components/Card"; //img4.png
import Card2 from "../components/Card2";
function Home() {
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: img,
      alt: "First slide",
    },
    {
      id: 2,
      image: img1,
      alt: "Second slide",
    },
    {
      id: 3,
      image: img2,
      alt: "Third slide",
    },
  ];

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to the cart`);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // ✅ Only runs once on mount

  return (
    <div>
      {/* Carousel Section */}
      <div className="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? "active" : ""}`}
            >
              <img src={slide.image} alt={slide.alt} className="carousel-image" />
            </div>
          ))}
        </div>

        {/* Previous and Next Buttons */}
        <button className="carousel-control prev" onClick={goToPrevSlide}>
          &#10094;
        </button>
        <button className="carousel-control next" onClick={goToNextSlide}>
          &#10095;
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      
      <div className="card-container1">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            state="sold out"
            image={CardImg}
            title="Organic Fruits"
            description="Kitchen Spices - Freshrerere and Healthy"
            price={904.0}
            options={["3 kg", "7 kg"]}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="card-container2">
        {[...Array(4)].map((_, index) => (
          <Card2
            key={index}
            state="sold out"
            image={CardImg2}
            title="Organic Fruits"
            description="Kitchen Spices - Fresh and Healthy"
            price={904.0}
            options={["3 kg", "7 kg"]}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
