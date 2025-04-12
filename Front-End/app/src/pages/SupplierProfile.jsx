import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
  const [supplierProducts, setSupplierProducts] = useState([]);

  // Fetch logged-in supplier's ID
  const fetchSupplierId = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v2/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSupplierId(res.data.SUPPLIER_ID);
      fetchSupplierProducts(res.data.SUPPLIER_ID);
    } catch (err) {
      console.error("Failed to fetch supplier ID:", err);
    }
  };

  // Fetch only products related to the supplier
  const fetchSupplierProducts = async (supplierId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v5/filterProducts", {
        p_SUPPLIER_ID: supplierId,
      });
      if (Array.isArray(response.data.msg)) {
        console.log("Supplier Products:", response.data.msg);
        setSupplierProducts(response.data.msg);
      }
    } catch (err) {
      console.error("Failed to fetch supplier's products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v4/allCategories",
      );
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

  const handleChange = e => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);

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
        },
      );

      if (response.data.msg === "Product Created Successfully ...") {
        alert("Product added successfully!");
        setProductData({
          name: "",
          imageUrl: "",
          weight: "",
          stock: "",
          price: "",
          categoryId: "",
        });
        fetchSupplierProducts(supplierId); // refresh product list
      } else {
        alert("Error: " + response.data.msg);
      }
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message,
      );
      alert(" Failed to add product.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f9f9", p: 5 }}>
      {/* Product form */}
      <Paper
        sx={{
          padding: 7,
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          mx: "auto",
          borderRadius: 4,
          mb: 4,
          boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
         
        }}
      >
        <Box
          sx={{
            mb: 4,
            textAlign: "center",
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            py: 2,
            borderRadius: 2,
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
          >
            <AddBoxIcon sx={{ fontSize: 32 }} /> Add New Product
          </Typography>
        </Box>

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

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              fullWidth
              variant="outlined"
              value={productData.weight}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              fullWidth
              variant="outlined"
              value={productData.stock}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>

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
            sx={{ mb: 4 }}
            value={productData.categoryId}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>
                {cat.NAME}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#ff7f00",
              ":hover": { backgroundColor: "#cc6a00" },
            }}
          >
            Submit Product
          </Button>
        </form>
      </Paper>

      {/* Supplier's own product list */}
      <Box sx={{ px: 2, maxWidth: "1000px", mx: "auto" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Your Added Products
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {supplierProducts.map((product) => (
            <Card key={product.PRODUCT_ID} sx={{ width: 240 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.IMAGE_URL || "https://via.placeholder.com/240x140"}
                alt={product.product_name}
              />
              <CardContent>
                <Typography fontWeight="bold">{product.NAME}</Typography>
                <Typography variant="body2">Price: ${product.PRICE}</Typography>
                <Typography variant="body2">Stock: {product.STOCK}</Typography>

              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SupplierProfile;
