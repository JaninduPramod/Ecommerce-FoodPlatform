import execution from "../config/db.mjs";
import { getUserByID } from "./userModel.mjs";
export { getAllFeedbacks, submitFeedback };

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
    } else if (error.errorNum === 2290) {
      return "The values must be greater than 0 !!!";
    }
  }
};
