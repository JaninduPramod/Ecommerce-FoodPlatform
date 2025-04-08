import { Router } from "express";
import {
  getAllFeedbacks,
  submitFeedback,
  getFeedbackByUserID,
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
  const response = await submitFeedback(req.body);

  res.status(200).json({ msg: response });
});

// // Fetching Feedback by USER ID
feedBackRoute.post("/api/v6/feedbackByUserId", async (req, res) => {
  const response = await getFeedbackByUserID(req.body.USER_ID);

  res.status(200).json({ msg: response });
});

// Update Product By ID
feedBackRoute.put("/api/v6/updateFeedback", async (req, res) => {
  const { _id, ...updateFields } = req.body;

  const response = await updateFeedback(_id, updateFields);

  res.status(200).json({ msg: response });
});

// Delete Product By ID
feedBackRoute.delete("/api/v6/deleteFeedback", async (req, res) => {
  const response = await deleteFeedback(req.body._id);
  res.status(200).json({ msg: response });
});

export default feedBackRoute;
