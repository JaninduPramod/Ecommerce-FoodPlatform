import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const SupplierProfile = () => {
  const [productData, setProductData] = useState({
    name: "",
    imageUrl: "",
    weight: "",
    stock: "",
    price: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [supplierId, setSupplierId] = useState(null);

  // Fetch supplier info
  const fetchSupplierId = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v2/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSupplierId(res.data.SUPPLIER_ID); // Adjust this if key name differs
    } catch (err) {
      console.error("Failed to fetch supplier ID:", err);
      alert("Could not load supplier profile.");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v4/allCategories");
      if (response.data.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchSupplierId();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!supplierId) {
      alert("Supplier ID not loaded.");
      return;
    }

    try {
      const payload = {
        p_CRUD_TYPE: "INSERT",   
        p_CATEGORY_ID: parseInt(productData.categoryId),
        p_NAME: productData.name,
        p_IMAGE_URL: productData.imageUrl || "",
        p_WEIGHT: productData.weight ? parseFloat(productData.weight) : null,
        p_STOCK: productData.stock ? parseInt(productData.stock) : null,
        p_PRICE: parseFloat(productData.price),
      };

      const response = await axios.post(
        "http://localhost:3000/api/v5/newProduct",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.msg === "Product Created Successfully ...") {
        alert(" Product added successfully!");
        setProductData({
          name: "",
          imageUrl: "",
          weight: "",
          stock: "",
          price: "",
          categoryId: "",
        });
      } else {
        alert(" Error: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert(" Failed to add product.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fffef6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: { xs: "95%", sm: "70%", md: "50%" },
          bgcolor: "#fff3e0",
        }}
        elevation={3}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Add New Product
        </Typography>

        <form onSubmit={handleAddProduct}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={productData.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Image URL"
            name="imageUrl"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={productData.imageUrl}
            onChange={handleChange}
          />

          <TextField
            label="Weight (kg)"
            name="weight"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={productData.weight}
            onChange={handleChange}
          />

          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={productData.stock}
            onChange={handleChange}
          />

          <TextField
            label="Price ($)"
            name="price"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={productData.price}
            onChange={handleChange}
            required
          />

          <TextField
            label="Category"
            name="categoryId"
            fullWidth
            select
            variant="outlined"
            sx={{ mb: 3 }}
            value={productData.categoryId}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>
                {cat.NAME}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
           
            sx={{ backgroundColor: "#ff7f00", ":hover": { backgroundColor: "#cc6a00" } }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SupplierProfile;
