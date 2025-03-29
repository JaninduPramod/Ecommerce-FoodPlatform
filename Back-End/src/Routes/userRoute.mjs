import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserByID,
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
  const { USER_ROLE, USER_NAME, USER_EMAIL, USER_PASSWORD } = req.body;

  const newuser = {
    USER_ROLE,
    USER_NAME,
    USER_EMAIL,
    USER_PASSWORD,
  };

  const response = await createUser(newuser);

  res.status(200).json({ msg: response });
});

// Fetching User by ID
userRoute.post("/api/v2/user-byid", async (req, res) => {
  const { USER_ID } = req.body;

  const response = await getUserByID(USER_ID);

  res.status(200).json({ msg: response });
});

// Update User By ID
userRoute.put("/api/v2/updateuser", async (req, res) => {
  const { USER_ID, USER_ROLE, USER_NAME, USER_EMAIL, USER_PASSWORD } = req.body;

  const updateFields = { USER_ROLE, USER_NAME, USER_EMAIL, USER_PASSWORD };

  const response = await updateUser(USER_ID, updateFields);

  res.status(200).json({ msg: response });
});

// Delete User By ID
userRoute.delete("/api/v2/deleteuser", async (req, res) => {
  const { USER_ID } = req.body;

  const response = await deleteUser(USER_ID);
  res.status(200).json({ msg: response });
});

export default userRoute;
