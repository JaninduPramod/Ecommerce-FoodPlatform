import { Router } from "express";
import { getMyOrders } from "../Models/orderModel.mjs";
import { verifyToken } from "../Auth/AuthController.mjs";

const OrderRoute = Router();

// Get Order details for Customer
OrderRoute.get("/api/v7/orderDetails", verifyToken, async (req, res) => {
  const USER_ID = { p_USER_ID: req.userId };

  const response = await getMyOrders(USER_ID);

  res.status(200).json({ msg: response });
});

export default OrderRoute;
