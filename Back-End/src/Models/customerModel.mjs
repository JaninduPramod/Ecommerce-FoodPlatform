import execution from "../config/db.mjs";

// All customers Method
const getAllCustomers = async () => {
  const query = "SELECT * FROM CUSTOMER";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Customers Available !!!";
  }
};

// //  customer by ID Method
const getCustomerByID = async (CUSTOMER_ID) => {
  const query = "SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = :CUSTOMER_ID";
  const response = await execution(query, [CUSTOMER_ID]);
  if (response.length <= 0) {
    return "Invalid Customer ID !!!";
  } else {
    return response;
  }
};

// Update Customer By ID
const updateCustomer = async (CUSTOMER_ID, updateFields) => {
  const query = `
        UPDATE CUSTOMER
        SET FULL_NAME = :FULL_NAME,
            PHONE = :PHONE,
            ADDRESS = :ADDRESS,
            IMAGE_URL = :IMAGE_URL
            
        WHERE CUSTOMER_ID = :CUSTOMER_ID
      `;

  const params = [
    updateFields.FULL_NAME,
    updateFields.PHONE,
    updateFields.ADDRESS,
    updateFields.IMAGE_URL,
    CUSTOMER_ID,
  ];

  try {
    const customerAvailablity = await getCustomerByID(CUSTOMER_ID);
    if (
      !customerAvailablity ||
      customerAvailablity == "Invalid Customer ID !!!"
    ) {
      return "Invalid Customer ID !!!";
    } else {
      await execution(query, params);
      return "Customer Updated Successfully ...";
    }
  } catch (error) {
    console.log("Database Error:", error);
  }
};

// Delete Customer By ID Method
const deleteCustomer = async (CUSTOMER_ID) => {
  const query = "DELETE FROM CUSTOMER WHERE CUSTOMER_ID = :CUSTOMER_ID";

  try {
    const customerAvailablity = await getCustomerByID(CUSTOMER_ID);
    if (
      !customerAvailablity ||
      customerAvailablity == "Invalid Customer ID !!!"
    ) {
      return "Invalid Customer ID !!!";
    } else {
      await execution(query, [CUSTOMER_ID]);
      return "Customer Deleted Successfully ...";
    }
  } catch (error) {
    console.log("Database error :", error);
  }
};

// Create new Customer Method
const createCustomer = async (newCustomer) => {
  const params = {
    CUSTOMER_ID: newCustomer.CUSTOMER_ID,
    FULL_NAME: newCustomer.FULL_NAME,
    PHONE: newCustomer.PHONE,
    ADDRESS: newCustomer.ADDRESS,
    IMAGE_URL: newCustomer.IMAGE_URL,
  };

  const query = `
      INSERT INTO CUSTOMER (CUSTOMER_ID, FULL_NAME, PHONE,ADDRESS,IMAGE_URL)
      VALUES (:CUSTOMER_ID, :FULL_NAME, :PHONE, :ADDRESS, :IMAGE_URL)
    `;

  try {
    await execution(query, params);
    return "Customer Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 1) {
      return "Customer Already Exists !!!";
    } else if (error.errorNum === 1400) {
      return "Null values are Not accepted !!!";
    } else if (error.errorNum === 2291) {
      return "The ID is not a User !!!";
    }
  }
};

export {
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
  createCustomer,
};
