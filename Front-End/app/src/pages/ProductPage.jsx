import {
  Box,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AllProducts from "../components/AllProducts";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [whatToFetch, setWhatToFetch] = useState(
    "http://localhost:3000/api/v5/filterProducts",
  );
  const [filters, setFilters] = useState({
    p_MIN_PRICE: "",
    p_MAX_PRICE: "",
    p_MIN_STOCK: "",
  });
  const [filterParams, setFilterParams] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v4/allCategoryNames",
      );
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setCategories(data.data);
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

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
    console.log("Selected Category:", event.target.value);
  };

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const filterParams = {
      ...filters,
      p_CATEGORY_NAME: selectedCategory || null, //
      p_MIN_PRICE: filters.p_MIN_PRICE ? parseFloat(filters.p_MIN_PRICE) : null,
      p_MAX_PRICE: filters.p_MAX_PRICE ? parseFloat(filters.p_MAX_PRICE) : null,
      p_MIN_STOCK: filters.p_MIN_STOCK ? parseFloat(filters.p_MIN_STOCK) : null,
    };

    setWhatToFetch("http://localhost:3000/api/v5/filterProducts");
    setFilterParams(filterParams);
  };

  return (
    <>
      <Box sx={{ mt: "125px", display: "flex", marginLeft: "70px" }}>
        <Box
          sx={{
            height: "660px",
            width: "400px",
            mt: "110px",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Button
            onClick={() => {
              setWhatToFetch(
                "http://localhost:3000/api/v5/productsWithDetails",
              );
              setFilterParams(null);
            }}
            variant="outlined"
          >
            All Products
          </Button>

          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            Filter Products
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
              mb: 2,
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

          <TextField
            label="Min Price"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            name="p_MIN_PRICE"
            value={filters.p_MIN_PRICE}
            onChange={handleFilterChange}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            name="p_MAX_PRICE"
            value={filters.p_MAX_PRICE}
            onChange={handleFilterChange}
          />

          <TextField
            label="Min Stock"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            name="p_MIN_STOCK"
            value={filters.p_MIN_STOCK}
            onChange={handleFilterChange}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#ff7d01", color: "white" }}
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </Box>

        <Box
          sx={{
            marginLeft: "60px",
          }}
        >
          <AllProducts whatToFetch={whatToFetch} filterParams={filterParams} />
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
