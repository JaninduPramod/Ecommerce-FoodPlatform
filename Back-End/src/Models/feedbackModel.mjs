import execution from "../config/db.mjs";
import { getUserByID } from "./userModel.mjs";
export {
  getAllFeedbacks,
  submitFeedback,
  getFeedbackByID,
  updateFeedback,
  deleteFeedback,
};

// // All Feedbacks Method
const getAllFeedbacks = async () => {
  const query = "SELECT * FROM CUSTOMER_FEEDBACK";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Feedbacks Available !!!";
  }
};

// Submit new Feedback Method
const submitFeedback = async (newFeedback) => {
  const params = {
    USER_ID: newFeedback.USER_ID,
    MESSAGE: newFeedback.MESSAGE,
    TYPE: newFeedback.TYPE,
    PRODUCT_ID: newFeedback.PRODUCT_ID,
  };

  const query = `
        INSERT INTO CUSTOMER_FEEDBACK (USER_ID, MESSAGE,TYPE,PRODUCT_ID)
        VALUES (:USER_ID, :MESSAGE,:TYPE,:PRODUCT_ID)
      `;

  try {
    const user = await getUserByID(params.USER_ID);
    if (user == "Invalid User ID !!!") {
      return "Invalid User ID !!!";
    } else {
      await execution(query, params);
      return "Feedback Submitted Successfully ...";
    }
  } catch (error) {
    if (error.errorNum === 2291) {
      return "Invalid Product !!!";
    }
  }
};

// //  Feedback by ID Method
const getFeedbackByID = async (FEEDBACK_ID) => {
  const query =
    "SELECT * FROM CUSTOMER_FEEDBACK WHERE FEEDBACK_ID = :FEEDBACK_ID";
  const response = await execution(query, [FEEDBACK_ID]);
  if (response.length <= 0) {
    return "Invalid Feedback ID !!!";
  } else {
    return response;
  }
};

// Update Feeback By ID
const updateFeedback = async (FEEDBACK_ID, updateFields) => {
  const query = `
          UPDATE CUSTOMER_FEEDBACK
          SET PRODUCT_ID = :PRODUCT_ID,
              USER_ID = :USER_ID,
              MESSAGE = :MESSAGE,
              TYPE = :TYPE
  
          WHERE FEEDBACK_ID = :FEEDBACK_ID
        `;

  const params = [
    updateFields.PRODUCT_ID,
    updateFields.USER_ID,
    updateFields.MESSAGE,
    updateFields.TYPE,
    FEEDBACK_ID,
  ];

  try {
    const feedbackAvailablity = await getFeedbackByID(FEEDBACK_ID);
    if (
      !feedbackAvailablity ||
      feedbackAvailablity == "Invalid Feedback ID !!!"
    ) {
      return "Invalid Feedback ID !!!";
    } else {
      await execution(query, params);
      return "Feedback Updated Successfully ...";
    }
  } catch (error) {
    if (error.errorNum === 2291) {
      return "Invalid Product or UserID !!!";
    }
  }
};

// Delete Feedback By ID Method
const deleteFeedback = async (FEEDBACK_ID) => {
  const query =
    "DELETE FROM CUSTOMER_FEEDBACK WHERE FEEDBACK_ID = :FEEDBACK_ID";

  try {
    const feedbackAvailablity = await getFeedbackByID(FEEDBACK_ID);
    if (
      !feedbackAvailablity ||
      feedbackAvailablity == "Invalid Feedback ID !!!"
    ) {
      return "Invalid Feedback ID !!!";
    } else {
      await execution(query, [FEEDBACK_ID]);
      return "Feedback Deleted Successfully ...";
    }
  } catch (error) {
    console.log("Database error :", error);
  }
};
