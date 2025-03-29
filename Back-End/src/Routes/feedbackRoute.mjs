import { Router } from "express";
import {
  getAllFeedbacks,
  submitFeedback,
  getFeedbackByID,
  updateFeedback,
  deleteFeedback,
} from "../Models/feedbackModel.mjs";

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

// // Fetching Feedback by ID
feedBackRoute.post("/api/v6/feedback-byid", async (req, res) => {
  const { FEEDBACK_ID } = req.body;

  const response = await getFeedbackByID(FEEDBACK_ID);

  res.status(200).json({ msg: response });
});

// Update Product By ID
feedBackRoute.put("/api/v6/updateFeedback", async (req, res) => {
  const { FEEDBACK_ID, USER_ID, MESSAGE, TYPE, PRODUCT_ID } = req.body;

  const updateFields = {
    USER_ID,
    MESSAGE,
    TYPE,
    PRODUCT_ID,
  };

  const response = await updateFeedback(FEEDBACK_ID, updateFields);

  res.status(200).json({ msg: response });
});

// Delete Product By ID
feedBackRoute.delete("/api/v6/deleteFeedback", async (req, res) => {
  const { FEEDBACK_ID } = req.body;

  const response = await deleteFeedback(FEEDBACK_ID);
  res.status(200).json({ msg: response });
});

export default feedBackRoute;
