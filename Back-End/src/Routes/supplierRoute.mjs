import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierByID,
  updateSupplier,
  deleteSupplier,
} from "../Models/supplierModel.mjs";
const supplierRoute = Router();

// // API for fetch ALL Suppliers
supplierRoute.get("/api/v3/allSuppliers", async (_, res) => {
  const response = await getAllSuppliers();

  res.status(200).json({ data: response });
});

// Create new Supplier
supplierRoute.post("/api/v3/newSupplier", async (req, res) => {
  const { SUPPLIER_ID, FULL_NAME, PHONE, ADDRESS, IMAGE_URL } = req.body;

  const newSupplier = {
    SUPPLIER_ID,
    FULL_NAME,
    PHONE,
    ADDRESS,
    IMAGE_URL,
  };

  const response = await createSupplier(newSupplier);

  res.status(200).json({ msg: response });
});

// // Fetching Supplier by ID
supplierRoute.post("/api/v3/supplier-byid", async (req, res) => {
  const { SUPPLIER_ID } = req.body;

  const response = await getSupplierByID(SUPPLIER_ID);

  res.status(200).json({ msg: response });
});

// Update Supplier By ID
supplierRoute.put("/api/v3/updateSupplier", async (req, res) => {
  const { SUPPLIER_ID, FULL_NAME, PHONE, ADDRESS, IMAGE_URL } = req.body;

  const updateFields = { FULL_NAME, PHONE, ADDRESS, IMAGE_URL };

  const response = await updateSupplier(SUPPLIER_ID, updateFields);

  res.status(200).json({ msg: response });
});

// Delete Supplier By ID
supplierRoute.delete("/api/v3/deleteSupplier", async (req, res) => {
  const { SUPPLIER_ID } = req.body;

  const response = await deleteSupplier(SUPPLIER_ID);
  res.status(200).json({ msg: response });
});

export default supplierRoute;
