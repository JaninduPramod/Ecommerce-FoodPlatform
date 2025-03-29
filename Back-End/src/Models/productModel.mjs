import execution from "../config/db.mjs";

// // All Products Method
const getAllProducts = async () => {
  const query = "SELECT * FROM PRODUCTS";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Products Available !!!";
  }
};

// Create new Supplier Method
const createProduct = async (newProduct) => {
  const params = {
    SUPPLIER_ID: newProduct.SUPPLIER_ID,
    CATEGORY_ID: newProduct.CATEGORY_ID,
    NAME: newProduct.NAME,
    IMAGE_URL: newProduct.IMAGE_URL,
    WEIGHT: newProduct.WEIGHT,
    STOCK: newProduct.STOCK,
    PRICE: newProduct.PRICE,
  };

  const query = `
      INSERT INTO PRODUCTS (SUPPLIER_ID, CATEGORY_ID,NAME,IMAGE_URL,WEIGHT,STOCK,PRICE)
      VALUES (:SUPPLIER_ID, :CATEGORY_ID,:NAME,:IMAGE_URL,:WEIGHT,:STOCK,:PRICE)
    `;

  try {
    await execution(query, params);
    return "Product Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 2291) {
      return "Invalid Supplier or Category !!!";
    } else if (error.errorNum === 2290) {
      return "The values must be greater than 0 !!!";
    }
  }
};

// //  Product by ID Method
const getProductByID = async (PRODUCT_ID) => {
  const query = "SELECT * FROM PRODUCTS WHERE PRODUCT_ID = :PRODUCT_ID";
  const response = await execution(query, [PRODUCT_ID]);
  if (response.length <= 0) {
    return "Invalid Product ID !!!";
  } else {
    return response;
  }
};

// Update Product By ID
const updateProduct = async (PRODUCT_ID, updateFields) => {
  const query = `
        UPDATE PRODUCTS
        SET SUPPLIER_ID = :SUPPLIER_ID,
            CATEGORY_ID = :CATEGORY_ID,
            NAME = :NAME,
            IMAGE_URL = :IMAGE_URL,
            WEIGHT = :WEIGHT,
            STOCK = :STOCK,
            PRICE = :PRICE

        WHERE PRODUCT_ID = :PRODUCT_ID
      `;

  const params = [
    updateFields.SUPPLIER_ID,
    updateFields.CATEGORY_ID,
    updateFields.NAME,
    updateFields.IMAGE_URL,
    updateFields.WEIGHT,
    updateFields.STOCK,
    updateFields.PRICE,
    PRODUCT_ID,
  ];

  try {
    const productAvailablity = await getProductByID(PRODUCT_ID);
    if (!productAvailablity || productAvailablity == "Invalid Product ID !!!") {
      return "Invalid Product ID !!!";
    } else {
      await execution(query, params);
      return "Product Updated Successfully ...";
    }
  } catch (error) {
    if (error.errorNum === 2291) {
      return "Invalid Supplier or Category !!!";
    } else if (error.errorNum === 2290) {
      return "The values must be greater than 0 !!!";
    }
  }
};

// Delete Product By ID Method
const deleteProduct = async (PRODUCT_ID) => {
  const query = "DELETE FROM PRODUCTS WHERE PRODUCT_ID = :PRODUCT_ID";

  try {
    const productAvailablity = await getProductByID(PRODUCT_ID);
    if (!productAvailablity || productAvailablity == "Invalid Product ID !!!") {
      return "Invalid Product ID !!!";
    } else {
      await execution(query, [PRODUCT_ID]);
      return "Product Deleted Successfully ...";
    }
  } catch (error) {
    console.log("Database error :", error);
  }
};

export {
  getAllProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
