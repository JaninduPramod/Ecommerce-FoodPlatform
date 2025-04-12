import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";
import SupplierNavbar from "../components/SupplierNavbar"; 

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/v2/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const supplierId = res.data.SUPPLIER_ID;

      const productRes = await axios.post("http://localhost:3000/api/v5/filterProducts", {
        p_SUPPLIER_ID: supplierId,
      });

      if (Array.isArray(productRes.data.msg)) {
        setProducts(productRes.data.msg);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <SupplierNavbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Your Added Products
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {products.map((product) => (
            <Card key={product.PRODUCT_ID} sx={{ width: 240 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.IMAGE_URL || "https://via.placeholder.com/240x140"}
                alt={product.PRODUCT_NAME}
              />
              <CardContent>
                <Typography fontWeight="bold">{product.PRODUCT_NAME}</Typography>
                <Typography variant="body2">Price: ${product.PRICE}</Typography>
                <Typography variant="body2">Stock: {product.STOCK}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SupplierProducts;
