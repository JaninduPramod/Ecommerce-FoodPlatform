import { Router } from "express";
import { getAllProducts } from "../Models/productModel.mjs";

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

export default productRoute;
