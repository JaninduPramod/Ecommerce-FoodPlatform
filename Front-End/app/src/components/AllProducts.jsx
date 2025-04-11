import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

export const CardLayout = ({
  Product,
  handleQuantityChange,
  handleAddToCart,
}) => {
  return (
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
            {Product.CATEGORY_NAME}
          </Typography>
          <Typography sx={{ mt: "5px" }} variant="h6">
            {Product.PRODUCT_NAME}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ${Product.PRICE}
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
                handleQuantityChange(Product.PRODUCT_ID, e.target.value)
              }
            />
          </Box>

          <Button
            variant="contained"
            color={Product.STOCK ? "primary" : "error"}
            sx={{ mt: 1, backgroundColor: "#ff7d01" }}
            onClick={() => handleAddToCart(Product)}
          >
            {Product.STOCK ? "Add to Cart" : "Sold Out"}
          </Button>
          <Button sx={{ mt: "10px", marginLeft: "18px" }} variant="outlined">
            View Product
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};

const AllProducts = ({ whatToFetch, filterParams }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const containerRef = useRef(null);

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

  const fetchProducts = async () => {
    try {
      let response;

      if (whatToFetch === "http://localhost:3000/api/v5/productsWithDetails") {
        response = await fetch(whatToFetch, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch(whatToFetch, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterParams || {}),
        });
      }

      const data = await response.json();

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
    fetchProducts();
  }, [whatToFetch, filterParams]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    scrollToTop();
  };

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mt: "25px",
            width: "1260px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {currentProducts.map((product, index) => (
            <CardLayout
              key={index}
              Product={product}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "75%",
            mt: 3,
          }}
        >
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default AllProducts;
