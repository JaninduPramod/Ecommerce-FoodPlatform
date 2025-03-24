// import { Router } from "express";
// import {
//   getAllSuppliers,
//   createSupplier,
//   getSupplierByID,
//   updateSupplier,
//   deleteSupplier,
// } from "../Models/supplierModel.mjs";

// const supplierRoute = Router();

// // API for fetch ALL Suppliers
// supplierRoute.get("/api/v3/allsuppliers", async (_, res) => {
//   const users = await getAllSuppliers();

//   if (users == "false") {
//     res.status(400).json({
//       message: "No suppliers ...",
//     });
//   } else {
//     res.status(200).json({
//       data: users,
//     });
//   }
// });

// // Create new Supplier
// supplierRoute.post("/api/v3/newuser", async (req, res) => {
//   const { username, user_password, user_email, user_role } = req.body;

//   const newuser = {
//     username,
//     user_password,
//     user_email,
//     user_role,
//   };

//   const response = await createUser(newuser);

//   res.status(200).json({ data: response });
// });

// // Fetching Supplier by ID
// supplierRoute.post("/api/v3/user-byid", async (req, res) => {
//   const { user_id } = req.body;

//   const response = await getUserByID(user_id);

//   if (response == "false") {
//     res.status(400).json({ msg: "Unavailable !!!" });
//   } else {
//     res.status(200).json({ msg: "User available", data: response });
//   }
// });

// // Update Supplier By ID
// supplierRoute.put("/api/v3/updateuser", async (req, res) => {
//   const { user_id, username, user_password, user_email, user_role } = req.body;

//   const updateFields = { username, user_password, user_email, user_role };

//   const response = await updateUser(user_id, updateFields);

//   res.status(200).json({ msg: "Updated", data: response });
// });

// // Delete Supplier By ID
// supplierRoute.delete("/api/v3/deleteuser", async (req, res) => {
//   const { user_id } = req.body;

//   if ((await getUserByID(user_id)) == "false") {
//     res.status(400).json({ msg: "Invalid User !!!" });
//   } else {
//     await deleteUser(user_id);
//     res.status(200).json({ msg: "User Deleted successfully ..." });
//   }
// });

// export default supplierRoute;
