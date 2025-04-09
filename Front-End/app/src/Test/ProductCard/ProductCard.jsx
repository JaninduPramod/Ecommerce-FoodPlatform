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
} from "@mui/material";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  const cardMapper = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v5/allproducts");

      const data = await res.json();
      console.log("data", data.msg);

      setProducts(data.msg || []);
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
                  {product.CATEGORY_ID}
                </Typography>
                <Typography sx={{ mt: "5px" }} variant="h6">
                  {product.NAME}
                </Typography>
                <Typography variant="h6" color="primary">
                  {product.PRICE}
                </Typography>

                <Button
                  variant="contained"
                  color={product.STOCK ? "primary" : "error"}
                  sx={{ mt: 1 }}
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
