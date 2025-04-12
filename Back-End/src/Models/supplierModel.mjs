import execution from "../config/db.mjs";

// // All Suppliers Method
const getAllSuppliers = async () => {
  const query = "SELECT * FROM SUPPLIER";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Suppliers Available !!!";
  }
};

// Create new Supplier Method
const createSupplier = async (newSupplier) => {
  const params = {
    p_SUPPLIER_ID: newSupplier.p_SUPPLIER_ID,
    p_FULL_NAME: newSupplier.p_FULL_NAME,
    p_PHONE: newSupplier.p_PHONE,
    p_ADDRESS: newSupplier.p_ADDRESS,
    p_IMAGE_URL: newSupplier.p_IMAGE_URL,
    p_CRUD_TYPE: newSupplier.p_CRUD_TYPE,
  };

  const query = `
  
    BEGIN
    SupplierControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_SUPPLIER_ID => :p_SUPPLIER_ID, 
        p_FULL_NAME   => :p_FULL_NAME,
        p_PHONE       => :p_PHONE,
        p_ADDRESS     => :p_ADDRESS,
        p_IMAGE_URL   => :p_IMAGE_URL
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Supplier Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 20002) {
      return "Supplier Already Exists !!!";
    } else if (error.errorNum === 20007) {
      return "Null values are Not accepted !!!";
    } else if (error.errorNum === 20001) {
      return "The Supplier ID is not a User !!!";
    }
  }
};

// //  Supplier by ID Method
const getSupplierByID = async (SUPPLIER_ID) => {
  const query = "SELECT * FROM SUPPLIER WHERE SUPPLIER_ID = :SUPPLIER_ID";
  const response = await execution(query, [SUPPLIER_ID]);
  if (response.length <= 0) {
    return "Invalid Supplier ID !!!";
  } else {
    return response;
  }
};

// Update Supplier By ID
const updateSupplier = async (updateFields) => {
  const query = `
  
    BEGIN
    SupplierControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_SUPPLIER_ID => :p_SUPPLIER_ID, 
        p_FULL_NAME   => :p_FULL_NAME,
        p_PHONE       => :p_PHONE,
        p_ADDRESS     => :p_ADDRESS,
        p_IMAGE_URL   => :p_IMAGE_URL
      );
    END;
  `;

  const params = {
    p_SUPPLIER_ID: updateFields.p_SUPPLIER_ID,
    p_FULL_NAME: updateFields.p_FULL_NAME,
    p_PHONE: updateFields.p_PHONE,
    p_ADDRESS: updateFields.p_ADDRESS,
    p_IMAGE_URL: updateFields.p_IMAGE_URL,
    p_CRUD_TYPE: updateFields.p_CRUD_TYPE,
  };

  try {
    await execution(query, params);
    return "Supplier Updated Successfully ...";
  } catch (error) {
    if (error.errorNum === 20007) {
      return "Null values are Not accepted !!!";
    } else if (error.errorNum === 20001) {
      return "Invalid Supplier ID !!!";
    }
  }
};

// Delete Supplier By ID Method
const deleteSupplier = async (deleteFields) => {
  const query = `
  
    BEGIN
    SupplierControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_SUPPLIER_ID => :p_SUPPLIER_ID
      );
    END;
  `;

  try {
    await execution(query, deleteFields);
    return "Supplier Deleted Successfully ...";
  } catch (error) {
    if (error.errorNum === 20003) {
      return "Supplier is Connected to product table  !!!";
    }
    if (error.errorNum === 20001) {
      return "Supplier ID does not exists!";
    }
  }
};

// Get Supplier by ID Method
const getSupplierProfile = async (userId) => {

  
  const query = `
    SELECT 
      USERS.USER_EMAIL as email,
      USERS.USER_PASSWORD as password,
      USERS.USER_ROLE as role,
      USERS.USER_NAME as username,
      SUPPLIER.PHONE as contact,
      SUPPLIER.ADDRESS as address,
      SUPPLIER.FULL_NAME as fullname
    FROM 
      USERS
    LEFT JOIN 
      SUPPLIER ON USERS.USER_ID = SUPPLIER.SUPPLIER_ID
    WHERE 
      USERS.USER_ID = :userId
  `;

  const params = { userId };
  const response = await execution(query, params);

  if (response.length === 0) {
    throw new Error("Supplier not found");
  }

  return response[0];
};

export {
  getAllSuppliers,
  createSupplier,
  getSupplierByID,
  updateSupplier,
  deleteSupplier,
  getSupplierProfile
};
