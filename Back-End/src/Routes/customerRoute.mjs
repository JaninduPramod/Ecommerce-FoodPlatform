import { Router } from "express";
import {
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
  createCustomer,
} from "../Models/customerModel.mjs";

const customerRoute = Router();

// Fetching All customers
customerRoute.get("/api/v1/allcustomers", async (_, res) => {
  const users = await getAllCustomers();

  if (users == "false") {
    res.status(400).json({
      message: "No customers",
    });
  }
  res.status(200).json({
    customers: users,
  });
});

// Fetching customer by ID
customerRoute.post("/api/v1/customer-byid", async (req, res) => {
  const { customer_id } = req.body;

  const response = await getCustomerByID(customer_id);

  if (response == "false") {
    res.status(400).json({ msg: "Unavailable !!!" });
  } else {
    res.status(200).json({ msg: "User available", data: response });
  }
});

// Update Customer By ID
customerRoute.put("/api/v1/updatecustomer", async (req, res) => {
  const { customer_id, customer_name, customer_age, customer_email } = req.body;

  const updateFields = { customer_name, customer_age, customer_email };

  const response = await updateCustomer(customer_id, updateFields);

  res.status(200).json({ msg: "Updated", data: response });
});

// Delete customer By ID
customerRoute.delete("/api/v1/deletecustomer", async (req, res) => {
  const { customer_id } = req.body;

  if ((await getCustomerByID(customer_id)) == "false") {
    res.status(400).json({ msg: "Invalid User !!!" });
  } else {
    await deleteCustomer(customer_id);
    res.status(200).json({ msg: "User Deleted successfully ..." });
  }
});

// Create new Customer
customerRoute.post("/api/v1/newcustomer", async (req, res) => {
  const { customer_id, customer_name, customer_age, customer_email } = req.body;

  const newcustomer = {
    customer_id,
    customer_name,
    customer_age,
    customer_email,
  };

  const response = await createCustomer(newcustomer);

  res.status(200).json({ data: response });
});

export default customerRoute;
