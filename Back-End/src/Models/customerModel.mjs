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
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_CUSTOMER_ID => :p_CUSTOMER_ID, 
        p_FULL_NAME   => :p_FULL_NAME,
        p_PHONE       => :p_PHONE,
        p_ADDRESS     => :p_ADDRESS,
        p_IMAGE_URL   => :p_IMAGE_URL
      );
    END;
  `;
  const params = {
    p_CUSTOMER_ID: updateFields.p_CUSTOMER_ID,
    p_FULL_NAME: updateFields.p_FULL_NAME,
    p_PHONE: updateFields.p_PHONE,
    p_ADDRESS: updateFields.p_ADDRESS,
    p_IMAGE_URL: updateFields.p_IMAGE_URL,
    p_CRUD_TYPE: updateFields.p_CRUD_TYPE,
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
const deleteCustomer = async (deleteFields) => {
  const query = `
  
    BEGIN
    CustomerControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_CUSTOMER_ID => :p_CUSTOMER_ID 
      );
    END;
  `;

  const params = {
    p_CUSTOMER_ID: deleteFields.p_CUSTOMER_ID,
    p_CRUD_TYPE: deleteFields.p_CRUD_TYPE,
  };

  try {
    await execution(query, params);
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
    p_CUSTOMER_ID: newCustomer.p_CUSTOMER_ID,
    p_FULL_NAME: newCustomer.p_FULL_NAME,
    p_PHONE: newCustomer.p_PHONE,
    p_ADDRESS: newCustomer.p_ADDRESS,
    p_IMAGE_URL: newCustomer.p_IMAGE_URL,
    p_CRUD_TYPE: newCustomer.p_CRUD_TYPE,
  };

  const query = `
  
    BEGIN
    CustomerControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_CUSTOMER_ID => :p_CUSTOMER_ID, 
        p_FULL_NAME   => :p_FULL_NAME,
        p_PHONE       => :p_PHONE,
        p_ADDRESS     => :p_ADDRESS,
        p_IMAGE_URL   => :p_IMAGE_URL
      );
    END;
  `;

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

// Pay For the Order Method
const doPayment = async (ORDER_ID) => {
  const query = `
  
    BEGIN UpdatePaymentStatus(
    p_ORDER_ID => :ORDER_ID
    );
    END;
  `;

  const params = {
    ORDER_ID: ORDER_ID,
  };

  try {
    await execution(query, params);
    return "Payment Done Successfully ...";
  } catch (error) {
    console.log("Database Error:", error);
    if (error.errorNum == 20001) {
      return "Order ID Not Found !!!";
    }
  }
};

// Cancel Order Method
const cancelOrder = async (ORDER_ID) => {
  const query = `DELETE FROM ORDERS WHERE ORDER_ID = :ORDER_ID`;

  const params = {
    ORDER_ID: ORDER_ID,
  };

  try {
    await execution(query, params);
    return "Order Cancelled Successfully !!";
  } catch (error) {
    console.log("Database Error:", error);
    if (error.errorNum == 20001) {
      return "Order ID Not Found !!!";
    }
  }
};

export {
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
  createCustomer,
  doPayment,
  cancelOrder,
};
