import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
  getProductDetails,
  filteredProductDetails,
} from "../Models/productModel.mjs";

const productRoute = Router();

// // API for fetch ALL Products
productRoute.get("/api/v5/allProducts", async (_, res) => {
  const response = await getAllProducts();

  res.status(200).json({ msg: response });
});

// Create new Product
productRoute.post("/api/v5/newProduct", async (req, res) => {
  const {
    p_CRUD_TYPE,
    p_SUPPLIER_ID,
    p_CATEGORY_ID,
    p_NAME,
    p_IMAGE_URL,
    p_WEIGHT,
    p_STOCK,
    p_PRICE,
  } = req.body;

  const newProduct = {
    p_CRUD_TYPE,
    p_SUPPLIER_ID,
    p_CATEGORY_ID,
    p_NAME,
    p_IMAGE_URL,
    p_WEIGHT,
    p_STOCK,
    p_PRICE,
  };

  const response = await createProduct(newProduct);

  res.status(200).json({ msg: response });
});

// // Fetching Product by ID
productRoute.post("/api/v5/product-byid", async (req, res) => {
  const { PRODUCT_ID } = req.body;

  const response = await getProductByID(PRODUCT_ID);

  res.status(200).json({ msg: response });
});

// Update Product By ID
productRoute.put("/api/v5/updateProduct", async (req, res) => {
  const {
    p_CRUD_TYPE,
    p_PRODUCT_ID,
    p_SUPPLIER_ID,
    p_CATEGORY_ID,
    p_NAME,
    p_IMAGE_URL,
    p_WEIGHT,
    p_STOCK,
    p_PRICE,
  } = req.body;

  const updateFields = {
    p_CRUD_TYPE,
    p_PRODUCT_ID,
    p_SUPPLIER_ID,
    p_CATEGORY_ID,
    p_NAME,
    p_IMAGE_URL,
    p_WEIGHT,
    p_STOCK,
    p_PRICE,
  };

  const response = await updateProduct(updateFields);

  res.status(200).json({ msg: response });
});

// Delete Product By ID
productRoute.delete("/api/v5/deleteProduct", async (req, res) => {
  const { p_CRUD_TYPE, p_PRODUCT_ID } = req.body;

  const deleteFields = { p_CRUD_TYPE, p_PRODUCT_ID };

  const response = await deleteProduct(deleteFields);
  res.status(200).json({ msg: response });
});

// // Get All product details for Frontend
productRoute.get("/api/v5/productsWithDetails", async (_, res) => {
  const response = await getProductDetails();

  res.status(200).json({ msg: response });
});

// Filtered Product Details
productRoute.post("/api/v5/filterProducts", async (req, res) => {
  const filters = req.body;
  const response = await filteredProductDetails(filters);

  res.status(200).json({ msg: response });
});

export default productRoute;
