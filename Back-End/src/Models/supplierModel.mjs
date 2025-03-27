import execution from "../config/db.mjs";

// // All Suppliers Method
const getAllSuppliers = async () => {
  const query = "SELECT * FROM SUPPLIER";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No users Available !!!";
  }
};

// Create new Supplier Method
const createSupplier = async (newSupplier) => {
  const params = {
    SUPPLIER_ID: newSupplier.SUPPLIER_ID,
    FULL_NAME: newSupplier.FULL_NAME,
    PHONE: newSupplier.PHONE,
    ADDRESS: newSupplier.ADDRESS,
    IMAGE_URL: newSupplier.IMAGE_URL,
  };

  const query = `
      INSERT INTO SUPPLIER (SUPPLIER_ID, FULL_NAME, PHONE,ADDRESS,IMAGE_URL)
      VALUES (:SUPPLIER_ID, :FULL_NAME, :PHONE, :ADDRESS, :IMAGE_URL)
    `;

  try {
    await execution(query, params);
    return "Supplier Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 1) {
      return "Supplier Already Exists !!!";
    } else if (error.errorNum === 1400) {
      return "Null values are Not accepted !!!";
    } else if (error.errorNum === 2291) {
      return "The ID is not a User !!!";
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
const updateSupplier = async (SUPPLIER_ID, updateFields) => {
  const query = `
        UPDATE SUPPLIER
        SET FULL_NAME = :FULL_NAME,
            PHONE = :PHONE,
            ADDRESS = :ADDRESS,
            IMAGE_URL = :IMAGE_URL
            
        WHERE SUPPLIER_ID = :SUPPLIER_ID
      `;

  const params = [
    updateFields.FULL_NAME,
    updateFields.PHONE,
    updateFields.ADDRESS,
    updateFields.IMAGE_URL,
    SUPPLIER_ID,
  ];

  try {
    await execution(query, params);

    return "Supplier Updated Successfully ...";
  } catch (error) {
    if (error.errorNum === 2290) {
      return "Invalid User Role !!!";
    } else if (error.errorNum === 1407) {
      return "Null values are Not accepted !!!";
    }
  }
};

// Delete Supplier By ID Method
const deleteSupplier = async (SUPPLIER_ID) => {
  const query = "DELETE FROM SUPPLIER WHERE SUPPLIER_ID = :SUPPLIER_ID";

  try {
    const supplierAvailablity = await getSupplierByID(SUPPLIER_ID);
    if (
      !supplierAvailablity ||
      supplierAvailablity == "Invalid Supplier ID !!!"
    ) {
      return "Invalid Supplier ID !!!";
    } else {
      await execution(query, [SUPPLIER_ID]);
      return "Supplier Deleted Successfully ...";
    }
  } catch (error) {
    console.log("Database error :", error);
  }
};

export {
  getAllSuppliers,
  createSupplier,
  getSupplierByID,
  updateSupplier,
  deleteSupplier,
};
