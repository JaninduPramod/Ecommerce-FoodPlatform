import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Box as MuiBox,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import SupplierNavbar from "../components/SupplierNavbar"; 

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const fetchSupplierId = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v2/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSupplierId(res.data.SUPPLIER_ID);
    } catch (err) {
      console.error("Failed to fetch supplier ID:", err);
    }
  };

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

      const response = await axios.post("http://localhost:3000/api/v5/newProduct", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.msg === "Product Created Successfully ...") {
        alert("Product added successfully!");
        navigate("/my-products"); // Redirect after success
      } else {
        alert("Error: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product.");
    }
  };

  return (
    <>
    <SupplierNavbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
 

      <Box sx={{ minHeight: "100vh", bgcolor: "#f4f9f9", p: 5 }}>
        <Paper
          sx={{
            padding: 7,
            width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
            mx: "auto",
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              mb: 4,
              textAlign: "center",
              bgcolor: "#2E7D32",
              py: 2,
              borderRadius: 2,
              color: "#fff",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              <AddBoxIcon sx={{ fontSize: 32 }} /> Add New Product
            </Typography>
          </Box>

          <form onSubmit={handleAddProduct}>
            <TextField label="Product Name" name="name" fullWidth variant="outlined" sx={{ mb: 2 }} value={productData.name} onChange={handleChange} required />
            <TextField label="Image URL" name="imageUrl" fullWidth variant="outlined" sx={{ mb: 2 }} value={productData.imageUrl} onChange={handleChange} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField label="Weight (kg)" name="weight" type="number" fullWidth variant="outlined" sx={{ mb: 2 }} value={productData.weight} onChange={handleChange} />
              <TextField label="Stock" name="stock" type="number" fullWidth variant="outlined" sx={{ mb: 2 }} value={productData.stock} onChange={handleChange} />
            </Box>
            <TextField label="Price ($)" name="price" type="number" fullWidth variant="outlined" sx={{ mb: 2 }} value={productData.price} onChange={handleChange} required />
            <TextField label="Category" name="categoryId" fullWidth select variant="outlined" sx={{ mb: 2 }} value={productData.categoryId} onChange={handleChange} required>
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>
                  {cat.NAME}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" fullWidth sx={{ background: "linear-gradient(90deg, #28a745, #218838)", fontWeight: "bold", fontSize: "20px", color: "#fff", mt: 4 }}>
              Add Product
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default SupplierProfile;
