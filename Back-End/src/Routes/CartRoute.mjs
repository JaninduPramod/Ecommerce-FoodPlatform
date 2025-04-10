import { Router } from "express";
import { addToCart, getMyProducts } from "../Models/cartModel.mjs";
import { verifyToken } from "../Auth/AuthController.mjs";

const CartRoute = Router();

// Add product to Cart
CartRoute.post("/api/v6/addToCart", verifyToken, async (req, res) => {
  const productWithDetails = { ...req.body, p_USER_ID: req.userId };

  const response = await addToCart(productWithDetails);

  res.status(200).json({ msg: response });
});

// Get Products from cart  By customer ID
CartRoute.get("/api/v6/cartProducts", verifyToken, async (req, res) => {
  const USER_ID = { p_USER_ID: req.userId };

  const response = await getMyProducts(USER_ID);

  res.status(200).json({ msg: response });
});

export default CartRoute;
