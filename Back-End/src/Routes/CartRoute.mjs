import { Router } from "express";
import addToCart from "../Models/cartModel.mjs";

const CartRoute = Router();

// Add product to Cart
CartRoute.post("/api/v6/addToCart", async (req, res) => {
  const product = req.body;
  const token = req.headers.authorization;

  const response = await addToCart({ ...product, token });

  res.status(200).json({ msg: response });
});

export default CartRoute;
