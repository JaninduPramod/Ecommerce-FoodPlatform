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
  const {
    p_CRUD_TYPE,
    p_USER_ROLE,
    p_USER_NAME,
    p_USER_EMAIL,
    p_USER_PASSWORD,
  } = req.body;

  const newuser = {
    p_CRUD_TYPE,
    p_USER_ROLE,
    p_USER_NAME,
    p_USER_EMAIL,
    p_USER_PASSWORD,
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
  const {
    p_CRUD_TYPE,
    p_USER_ID,
    p_USER_ROLE,
    p_USER_NAME,
    p_USER_EMAIL,
    p_USER_PASSWORD,
  } = req.body;

  const updateFields = {
    p_CRUD_TYPE,
    p_USER_ID,
    p_USER_ROLE,
    p_USER_NAME,
    p_USER_EMAIL,
    p_USER_PASSWORD,
  };

  const response = await updateUser(updateFields);

  res.status(200).json({ msg: response });
});

// Delete User By ID
userRoute.delete("/api/v2/deleteuser", async (req, res) => {
  const { p_CRUD_TYPE, p_USER_ID } = req.body;

  const deleteFields = {
    p_CRUD_TYPE,
    p_USER_ID,
  };

  const response = await deleteUser(deleteFields);
  res.status(200).json({ msg: response });
});

export default userRoute;
