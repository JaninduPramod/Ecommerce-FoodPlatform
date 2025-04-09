import { Router } from "express";
import {
  getAllUsers,
  createUser,
  userLogin,
  updateUser,
  deleteUser,
} from "../Models/userModel.mjs";

const userRoute = Router();

// API for fetch ALL users
userRoute.get("/api/v2/allusers", async (_, res) => {
  const response = await getAllUsers();

  res.status(200).json({ data: response });
});

// Create new User
userRoute.post("/api/v2/newuser", async (req, res) => {
  const newuser = req.body;

  const response = await createUser(newuser);

  res.status(200).json({ msg: response });
});

// User Login
userRoute.post("/api/v2/userLogin", async (req, res) => {
  // body should contain USER_EMAIL and USER_PASSWORD
  const loginCredentials = req.body;
  const response = await userLogin(loginCredentials);

  res.status(200).json({ msg: response });
});

// Update User By ID
userRoute.put("/api/v2/updateuser", async (req, res) => {
  const updateFields = req.body;

  const response = await updateUser(updateFields);

  res.status(200).json({ msg: response });
});

// Delete User By ID
userRoute.delete("/api/v2/deleteuser", async (req, res) => {
  const deleteFields = req.body;

  const response = await deleteUser(deleteFields);
  res.status(200).json({ msg: response });
});

export default userRoute;
