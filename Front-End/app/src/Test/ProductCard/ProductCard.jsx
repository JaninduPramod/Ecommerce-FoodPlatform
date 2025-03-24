import React from "react";
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

const products = [
  {
    id: 1,
    image:
      "https://freshgo-webibazaar.myshopify.com/cdn/shop/products/14_ac27a02a-b802-4898-8323-1ffd20cde171_350x.jpg?v=1625661113",
    name: "Pomegranate - Small",
    category: "Summer Fruits",
    price: "$280.00",
    oldPrice: "$390.00",
    available: true,
  },
];

const ProductSlider = () => {
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
        <SwiperSlide key={product.id}>
          <Paper elevation={2} sx={{ width: "400px", textAlign: "center" }}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="h6" color="primary">
                  {product.price}
                </Typography>
                {product.oldPrice && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    {product.oldPrice}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color={product.available ? "primary" : "error"}
                  sx={{ mt: 1 }}
                >
                  {product.available ? "Add to Cart" : "Sold Out"}
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
