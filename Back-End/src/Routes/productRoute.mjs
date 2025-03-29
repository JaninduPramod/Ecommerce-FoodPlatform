import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
} from "../Models/productModel.mjs";

const productRoute = Router();

// // API for fetch ALL Products
productRoute.get("/api/v5/allProducts", async (_, res) => {
  const response = await getAllProducts();

  res.status(200).json({ msg: response });
});

// Create new Product
productRoute.post("/api/v5/newProduct", async (req, res) => {
  const { SUPPLIER_ID, CATEGORY_ID, NAME, IMAGE_URL, WEIGHT, STOCK, PRICE } =
    req.body;

  const newProduct = {
    SUPPLIER_ID,
    CATEGORY_ID,
    NAME,
    IMAGE_URL,
    WEIGHT,
    STOCK,
    PRICE,
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
    PRODUCT_ID,
    SUPPLIER_ID,
    CATEGORY_ID,
    NAME,
    IMAGE_URL,
    WEIGHT,
    STOCK,
    PRICE,
  } = req.body;

  const updateFields = {
    SUPPLIER_ID,
    CATEGORY_ID,
    NAME,
    IMAGE_URL,
    WEIGHT,
    STOCK,
    PRICE,
  };

  const response = await updateProduct(PRODUCT_ID, updateFields);

  res.status(200).json({ msg: response });
});

// Delete Product By ID
productRoute.delete("/api/v5/deleteProduct", async (req, res) => {
  const { PRODUCT_ID } = req.body;

  const response = await deleteProduct(PRODUCT_ID);
  res.status(200).json({ msg: response });
});

export default productRoute;
