import execution from "../config/db.mjs";

// All customers Method
const getAllCustomers = async () => {
  const query = "SELECT * FROM customer";
  const users = await execution(query);
  if (users.length > 0) {
    return users;
  } else {
    return "false";
  }
};

//  customer by ID Method
const getCustomerByID = async (id) => {
  const query = "SELECT * FROM customer WHERE customer_id = :id";
  const user = await execution(query, [id]);
  if (user.length < 1) {
    return "false";
  }
  return user;
};

// Update customer By ID
const updateCustomer = async (id, updateFields) => {
  const query = `
    UPDATE customer
    SET customer_name = :customer_name,
        customer_age = :customer_age,
        customer_email = :customer_email
        
    WHERE customer_id = :id
  `;

  const params = [
    updateFields.customer_name,
    updateFields.customer_age,
    updateFields.customer_email,
    id,
  ];

  await execution(query, params);

  return getCustomerByID(id);
};

// Delete customer By ID Method
const deleteCustomer = async (id) => {
  const query = "DELETE FROM customer WHERE customer_id = :id";
  return await execution(query, [id]);
};

// Create new Customer Method
const createCustomer = async (newcustomer) => {
  const params = {
    customer_id: newcustomer.customer_id,
    customer_name: newcustomer.customer_name,
    customer_age: newcustomer.customer_age,
    customer_email: newcustomer.customer_email,
  };

  const query = `
    INSERT INTO customer (customer_id, customer_name, customer_age, customer_email) 
    VALUES (:customer_id, :customer_name, :customer_age, :customer_email)
  `;

  await execution(query, params);
  return getCustomerByID(params.customer_id);
};

export {
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer,
  createCustomer,
};
