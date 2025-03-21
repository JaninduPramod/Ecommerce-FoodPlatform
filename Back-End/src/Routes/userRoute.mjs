import { Router } from "express";
import { getAllUsers } from "../Models/user.mjs";

const userRoute = Router();

userRoute.get("/api/v1/allusers", async (_, res) => {
  const users = await getAllUsers();

  res.json(users);
});

export default userRoute;
