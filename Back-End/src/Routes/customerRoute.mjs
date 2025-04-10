import { Router } from "express";
import {
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
  createCustomer,
} from "../Models/customerModel.mjs";
import jwt from "jsonwebtoken";

const customerRoute = Router();
const SECRET_KEY = "urbanEcommerceSecretKey";

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// // API for fetch ALL Customers
customerRoute.get("/api/v1/allcustomers", async (_, res) => {
  const response = await getAllCustomers();

  res.status(200).json({ data: response });
});

// // Fetching Customer by ID
customerRoute.post("/api/v1/customer-byid", async (req, res) => {
  const { CUSTOMER_ID } = req.body;

  const response = await getCustomerByID(CUSTOMER_ID);

  res.status(200).json({ msg: response });
});

// Update Customer By ID
customerRoute.put("/api/v1/updateCustomer", verifyToken, async (req, res) => {
  const updateFields = { ...req.body, p_CUSTOMER_ID: req.userId };

  const response = await updateCustomer(updateFields);

  res.status(200).json({ msg: response });
});

// Delete Customer By ID
customerRoute.delete("/api/v1/deleteCustomer", async (req, res) => {
  const { p_CRUD_TYPE, p_CUSTOMER_ID } = req.body;

  const deleteFields = {
    p_CRUD_TYPE,
    p_CUSTOMER_ID,
  };

  const response = await deleteCustomer(deleteFields);
  res.status(200).json({ msg: response });
});

// Create new customer
customerRoute.post("/api/v1/newcustomer", async (req, res) => {
  const {
    p_CRUD_TYPE,
    p_CUSTOMER_ID,
    p_FULL_NAME,
    p_PHONE,
    p_ADDRESS,
    p_IMAGE_URL,
  } = req.body;

  const newCustomer = {
    p_CRUD_TYPE,
    p_CUSTOMER_ID,
    p_FULL_NAME,
    p_PHONE,
    p_ADDRESS,
    p_IMAGE_URL,
  };

  const response = await createCustomer(newCustomer);

  res.status(200).json({ msg: response });
});

export default customerRoute;
