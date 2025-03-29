import { Router } from "express";
import { getAllFeedbacks, submitFeedback } from "../Models/feedbackModel.mjs";

const feedBackRoute = Router();

// // API for fetch ALL Feedbacks
feedBackRoute.get("/api/v6/allFeedbacks", async (_, res) => {
  const response = await getAllFeedbacks();

  res.status(200).json({ msg: response });
});

// Submit new Feedback
feedBackRoute.post("/api/v6/submitFeedback", async (req, res) => {
  const { USER_ID, MESSAGE, TYPE, PRODUCT_ID } = req.body;

  const newFeedback = {
    USER_ID,
    MESSAGE,
    TYPE,
    PRODUCT_ID,
  };

  const response = await submitFeedback(newFeedback);

  res.status(200).json({ msg: response });
});

export default feedBackRoute;
