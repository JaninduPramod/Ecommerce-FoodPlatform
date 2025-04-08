import ProductFeedback from "../config/mongoModel.mjs";

export const getAllFeedbacks = async () => {
  return await ProductFeedback.find({}, {});
};

export const submitFeedback = async (data) => {
  const feedback = new ProductFeedback(data);
  await feedback.save();
  return "MongoDB Feedback Submitted Successfully!";
};

export const getFeedbackByUserID = async (id) => {
  const feedback = await ProductFeedback.findOne({ USER_ID: id });
  return feedback || "Feedback not found!";
};

export const updateFeedback = async (id, updatedData) => {
  const result = await ProductFeedback.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result ? "Feedback Updated!" : "Feedback not found!";
};

export const deleteFeedback = async (id) => {
  const result = await ProductFeedback.findByIdAndDelete(id);
  return result ? "Feedback Deleted!" : "Feedback not found!";
};
