import { Router } from "express";
import jwt from "jsonwebtoken";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
} from "../Models/userModel.mjs";

import { LoginUser, verifyToken } from "../Auth/AuthController.mjs";

const userRoute = Router();

// API for fetch ALL users
userRoute.get("/api/v2/allusers", async (_, res) => {
  const response = await getAllUsers();

  res.status(200).json({ data: response });
});

// Get User by ID
userRoute.get("/api/v2/profile", verifyToken, async (req, res) => {
  try {
    const profile = await getUserProfile(req.userId);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create new User
userRoute.post("/api/v2/newuser", async (req, res) => {
  const newuser = req.body;

  const response = await createUser(newuser);

  res.status(200).json({ msg: response });
});

// User Login
userRoute.post("/api/v2/userLogin", LoginUser);

// Update User By ID
userRoute.put("/api/v2/updateuser", verifyToken, async (req, res) => {
  const updateFields = { ...req.body, p_USER_ID: req.userId };

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
