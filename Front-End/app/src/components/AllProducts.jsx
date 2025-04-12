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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const ProductDialog = ({ product, open, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit feedback.");
        return;
      }

      if (!feedback.trim()) {
        alert("Feedback cannot be empty.");
        return;
      }

      const feedbackData = {
        PRODUCT_ID: product.PRODUCT_ID, // Pass the product ID
        MESSAGE: feedback, // Pass the feedback message
      };

      const response = await axios.post(
        "http://localhost:3000/api/v6/submitFeedback",
        feedbackData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        },
      );

      if (response.data.msg === "MongoDB Feedback Submitted Successfully!") {
        alert("Feedback submitted successfully!");
        setFeedback(""); // Clear the feedback input after submission
      } else {
        alert(response.data.msg || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleQuantityChange = e => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleFeedbackChange = e => {
    setFeedback(e.target.value); // Update feedback state
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          fontWeight: "bold",
        }}
      >
        {product.PRODUCT_NAME}
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={product.IMAGE_URL || "https://via.placeholder.com/400"}
              alt={product.PRODUCT_NAME}
              sx={{ borderRadius: 2, objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {product.PRODUCT_NAME}
              </Typography>
              <Chip
                label={product.CATEGORY_NAME}
                color="primary"
                sx={{ mb: 2 }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                ${product.PRICE}
              </Typography>
              <Typography
                variant="body1"
                color={product.STOCK > 0 ? "success.main" : "error.main"}
                sx={{ fontWeight: "bold" }}
              >
                {product.STOCK > 0
                  ? `In Stock (${product.STOCK} available)`
                  : "Out of Stock"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2} sx={{ mt: 3 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                inputProps={{ min: 1, max: product.STOCK }}
                size="small"
                sx={{ width: 100 }}
                onChange={handleQuantityChange}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!product.STOCK}
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                sx={{
                  backgroundColor: "#ff7d01",
                  "&:hover": {
                    backgroundColor: "#e66a00",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid #e0e0e0",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 60 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              value={feedback}
              onChange={handleFeedbackChange}
              fullWidth
              multiline
              rows={2}
              placeholder="Enter your feedback here"
            />
            <Button onClick={handleSubmitFeedback} variant="contained">
              Submit Feedback
            </Button>
          </Box>

          <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleQuantityChange = e => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ width: "400px", borderRadius: "25px", margin: "10px" }}
      >
        <Card sx={{ borderRadius: "25px" }}>
          <CardMedia
            component="img"
            height="200"
            image={product.IMAGE_URL || "https://via.placeholder.com/400"}
            alt={product.PRODUCT_NAME}
            sx={{ objectFit: "contain" }}
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
            <Box display="flex" alignItems="center" gap={1} sx={{ my: 1 }}>
              <Typography variant="body1">Qty:</Typography>
              <TextField
                type="number"
                value={quantity}
                inputProps={{ min: 1 }}
                size="small"
                sx={{ width: 65 }}
                onChange={handleQuantityChange}
              />
            </Box>

            <Button
              variant="contained"
              color={product.STOCK ? "primary" : "error"}
              sx={{ mt: 1, backgroundColor: "#ff7d01", width: "100%" }}
              onClick={handleAddToCartClick}
              disabled={!product.STOCK}
            >
              {product.STOCK ? "Add to Cart" : "Sold Out"}
            </Button>
            <Button
              sx={{ mt: "10px", width: "100%" }}
              variant="outlined"
              onClick={handleOpenDialog}
            >
              View Product
            </Button>
          </CardContent>
        </Card>
      </Paper>

      <ProductDialog
        product={product}
        open={openDialog}
        onClose={handleCloseDialog}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

const AllProducts = ({ whatToFetch, filterParams }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  const productsPerPage = 12;

  const handleAddToCart = async (product, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v6/addToCart", {
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

      const data = await response.json();
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
      const response =
        whatToFetch === "http://localhost:3000/api/v5/productsWithDetails"
          ? await fetch(whatToFetch)
          : await fetch(whatToFetch, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(filterParams || {}),
            });

      const data = await response.json();
      setProducts(data.msg && Array.isArray(data.msg) ? data.msg : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
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
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    scrollToTop();
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1300px",
          gap: 2,
          px: 2,
        }}
      >
        {currentProducts.map(product => (
          <ProductCard
            key={product.PRODUCT_ID}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>

      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4 }}
      />
    </Box>
  );
};

export default AllProducts;
