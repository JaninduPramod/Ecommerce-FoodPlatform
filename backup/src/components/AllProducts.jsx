import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const CardLayout = ({ Product }) => {
  return (
    <>
      <Paper
        elevation={2}
        sx={{ width: "400px", borderRadius: "25px", margin: "10px" }}
      >
        <Card sx={{ borderRadius: "25px" }}>
          <CardMedia
            component="img"
            image="https://freshgo-webibazaar.myshopify.com/cdn/shop/products/1_350x.jpg?v=1625658832"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {Product.PRODUCT_ID}
            </Typography>
            <Typography sx={{ mt: "5px" }} variant="h6">
              {Product.NAME}
            </Typography>
            <Typography variant="h6" color="primary">
              {Product.PRICE}
            </Typography>

            <Button
              variant="contained"
              color={Product.STOCK ? "primary" : "error"}
              sx={{ mt: 1 }}
            >
              {Product.STOCK ? "Add to Cart" : "Sold Out"}
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

const MapBox = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v5/allproducts");
      const data = await response.json();

      if (data.msg && Array.isArray(data.msg)) {
        setProducts(data.msg); // Update the products state with the fetched data
      } else {
        console.warn("No products available or invalid response format.");
        setProducts([]); // Clear the products state if no products are available
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mt: "25px",
            backgroundColor: "#121212",
            width: "75%",
            height: "50%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {products.map((product, index) => (
            <CardLayout key={index} Product={product} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MapBox;
