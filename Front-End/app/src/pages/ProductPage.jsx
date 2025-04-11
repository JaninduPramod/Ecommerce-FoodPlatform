import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllProducts from "../components/AllProducts";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const APIinAllProducts = "http://localhost:3000/api/v5/productsWithDetails";

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v4/allCategoryNames",
      );
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setCategories(data.data); // Update categories state
      } else {
        console.warn("No categories available or invalid response format.");
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle dropdown selection
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
    console.log("Selected Category:", event.target.value); // Debugging log
  };

  return (
    <>
      <Box sx={{ mt: "125px", display: "flex", marginLeft: "85px" }}>
        {/* Left Box with Dropdown */}
        <Box
          sx={{
            height: "660px",
            width: "400px",
            backgroundColor: "grey",
            mt: "110px",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            Filter by Category
          </Typography>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "5px",
            }}
          >
            <MenuItem value="" disabled>
              Select a Category
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.NAME}>
                {category.NAME}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Right Box with All Products */}
        <Box
          sx={{
            marginLeft: "60px",
          }}
        >
          <AllProducts whatToFetch={APIinAllProducts} />
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
