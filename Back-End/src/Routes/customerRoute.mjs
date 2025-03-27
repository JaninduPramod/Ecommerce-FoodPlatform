import { Router } from "express";
import {
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
  createCustomer,
} from "../Models/customerModel.mjs";

const customerRoute = Router();

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

// Update Supplier By ID
customerRoute.put("/api/v1/updateCustomer", async (req, res) => {
  const { CUSTOMER_ID, FULL_NAME, PHONE, ADDRESS, IMAGE_URL } = req.body;

  const updateFields = { FULL_NAME, PHONE, ADDRESS, IMAGE_URL };

  const response = await updateCustomer(CUSTOMER_ID, updateFields);

  res.status(200).json({ msg: response });
});

// Delete Customer By ID
customerRoute.delete("/api/v1/deleteCustomer", async (req, res) => {
  const { CUSTOMER_ID } = req.body;

  const response = await deleteCustomer(CUSTOMER_ID);
  res.status(200).json({ msg: response });
});

// Create new customer
customerRoute.post("/api/v1/newcustomer", async (req, res) => {
  const { CUSTOMER_ID, FULL_NAME, PHONE, ADDRESS, IMAGE_URL } = req.body;

  const newCustomer = {
    CUSTOMER_ID,
    FULL_NAME,
    PHONE,
    ADDRESS,
    IMAGE_URL,
  };

  const response = await createCustomer(newCustomer);

  res.status(200).json({ msg: response });
});

export default customerRoute;
