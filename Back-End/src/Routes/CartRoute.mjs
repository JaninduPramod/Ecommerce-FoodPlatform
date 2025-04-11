import { Router } from "express";
import {
  addToCart,
  getMyProducts,
  deleteCartItem,
  placeOrderFor,
} from "../Models/cartModel.mjs";
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

// Delete Cart Item By ID
CartRoute.delete("/api/v6/deleteCartItem", async (req, res) => {
  const response = await deleteCartItem(req.body.CART_ID);
  res.status(200).json({ msg: response });
});

// place Order for Customer
CartRoute.post("/api/v6/placeOrder", verifyToken, async (req, res) => {
  const response = await placeOrderFor(req.userId);

  res.status(200).json({ msg: response });
});

export default CartRoute;
