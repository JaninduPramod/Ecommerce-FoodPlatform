import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
  TextField,
  Box,
} from "@mui/material";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleAddToCart = async product => {
    try {
      const token = localStorage.getItem("token");
      const quantity = quantities[product.PRODUCT_ID] || 1;

      const res = await fetch("http://localhost:3000/api/v6/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          p_PRODUCT_ID: product.PRODUCT_ID,
          p_QUANTITY: quantity,
        }),
      });

      const data = await res.json();
      console.log("Add to Cart Response:", data);

      if (data.msg === "Product added to cart successfully.") {
        alert("Product added to cart successfully.");
      } else {
        alert(data.msg || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong.");
    }
  };

  const cardMapper = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/v5/productsWithDetails",
      );
      const data = await res.json();
      console.log("Fetched products:", data.msg);

      if (data.msg && Array.isArray(data.msg)) {
        setProducts(data.msg);
      } else {
        console.warn("No products available or invalid response format.");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    cardMapper();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      style={{ padding: "20px" }}
    >
      {products.map(product => (
        <SwiperSlide key={product.PRODUCT_ID}>
          <Paper elevation={2} sx={{ width: "400px", borderRadius: "25px" }}>
            <Card sx={{ borderRadius: "25px" }}>
              <CardMedia
                component="img"
                image="https://freshgo-webibazaar.myshopify.com/cdn/shop/products/1_350x.jpg?v=1625658832"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {product.CATEGORY_NAME}
                </Typography>
                <Typography sx={{ mt: "5px" }} variant="h6">
                  {product.PRODUCT_NAME}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${product.PRICE}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">Qty</Typography>
                  <TextField
                    type="number"
                    defaultValue={1}
                    inputProps={{ min: 1 }}
                    size="small"
                    sx={{ width: 65 }}
                    onChange={e =>
                      handleQuantityChange(product.PRODUCT_ID, e.target.value)
                    }
                  />
                </Box>

                <Button
                  variant="contained"
                  color={product.STOCK ? "primary" : "error"}
                  sx={{ mt: 1, backgroundColor: "#ff7d01" }}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.STOCK ? "Add to Cart" : "Sold Out"}
                </Button>
              </CardContent>
            </Card>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
