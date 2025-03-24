import { Router } from "express";
import { getAllProducts, createProduct } from "../Models/productModel.mjs";

const productRoute = Router();

// API for fetch ALL Products
productRoute.get("/api/v4/allproducts", async (_, res) => {
  const response = await getAllProducts();

  if (response == "false") {
    res.status(400).json({
      message: "No Users ...",
    });
  } else {
    res.status(200).json({
      data: response,
    });
  }
});

// Create new Product
productRoute.post("/api/v4/newproduct", async (req, res) => {
  const { product_category, product_name, user_id, product_price } = req.body;

  const newproduct = {
    product_category,
    product_name,
    user_id,
    product_price,
  };

  const response = await createProduct(newproduct);

  res.status(200).json({ data: response });
});

export default productRoute;
