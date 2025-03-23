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
  const users = await getAllUsers();

  if (users == "false") {
    res.status(400).json({
      message: "No Users ...",
    });
  } else {
    res.status(200).json({
      data: users,
    });
  }
});

// Create new User
userRoute.post("/api/v2/newuser", async (req, res) => {
  const { username, user_password, user_email, user_role } = req.body;

  const newuser = {
    username,
    user_password,
    user_email,
    user_role,
  };

  const response = await createUser(newuser);

  res.status(200).json({ data: response });
});

// Fetching User by ID
userRoute.post("/api/v2/user-byid", async (req, res) => {
  const { user_id } = req.body;

  const response = await getUserByID(user_id);

  if (response == "false") {
    res.status(400).json({ msg: "Unavailable !!!" });
  } else {
    res.status(200).json({ msg: "User available", data: response });
  }
});

// Update User By ID
userRoute.put("/api/v2/updateuser", async (req, res) => {
  const { user_id, username, user_password, user_email, user_role } = req.body;

  const updateFields = { username, user_password, user_email, user_role };

  const response = await updateUser(user_id, updateFields);

  res.status(200).json({ msg: "Updated", data: response });
});

// Delete User By ID
userRoute.delete("/api/v2/deleteuser", async (req, res) => {
  const { user_id } = req.body;

  if ((await getUserByID(user_id)) == "false") {
    res.status(400).json({ msg: "Invalid User !!!" });
  } else {
    await deleteUser(user_id);
    res.status(200).json({ msg: "User Deleted successfully ..." });
  }
});

export default userRoute;
