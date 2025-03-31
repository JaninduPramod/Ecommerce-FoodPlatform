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
const updateCustomer = async (updateFields) => {
  const query = `
  
    BEGIN
    CustomerControllerProcedure(
        p_CrudType    => :p_CrudType,
        p_CUSTOMER_ID => :p_CUSTOMER_ID, 
        p_FULL_NAME   => :p_FULL_NAME,
        p_PHONE       => :p_PHONE,
        p_ADDRESS     => :p_ADDRESS,
        p_IMAGE_URL   => :p_IMAGE_URL
      );
    END;
  `;
  const params = {
    p_CUSTOMER_ID: updateFields.CUSTOMER_ID,
    p_FULL_NAME: updateFields.FULL_NAME,
    p_PHONE: updateFields.PHONE,
    p_ADDRESS: updateFields.ADDRESS,
    p_IMAGE_URL: updateFields.IMAGE_URL,
    p_CrudType: updateFields.CRUD_TYPE,
  };

  try {
    await execution(query, params);
    return "Customer Updated Successfully ...";
  } catch (error) {
    if (error.errorNum === 20001) {
      return "Customer ID Not Found !!!";
    } else {
      console.log("Database Error:", error);
      return "Error in Updating Customer ...";
    }
  }
};

// Delete Customer By ID Method
const deleteCustomer = async (CUSTOMER_ID) => {
  const query = "BEGIN DeleteCustomer(:CUSTOMER_ID); END;";

  try {
    await execution(query, [CUSTOMER_ID]);
    return "Customer Deleted Successfully ...";
  } catch (error) {
    console.log("Database Error:", error);
    if (error.errorNum == 20001) {
      return "Customer ID Not Found !!!";
    }
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

  const query = `BEGIN NewCustomer(:CUSTOMER_ID, :FULL_NAME, :PHONE, :ADDRESS, :IMAGE_URL); END;`;

  try {
    await execution(query, params);
    return "Customer Created Successfully ...";
  } catch (error) {
    console.log("Database Error:", error);
    if (error.errorNum === 20000) {
      return "Customer Already Exists !!!";
    } else if (error.errorNum === 20001) {
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
