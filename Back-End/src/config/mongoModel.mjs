import mongoose from "mongoose";

const productFeedbackSchema = new mongoose.Schema({
  PRODUCT_ID: Number,
  USER_ID: Number,
  MESSAGE: String,
  TYPE: String,
  TIMESTAMP: {
    type: Date,
    default: Date.now,
  },
});

const ProductFeedback = mongoose.model(
  "ProductFeedback",
  productFeedbackSchema,
  "ProductFeedbacks"
);

export default ProductFeedback;
