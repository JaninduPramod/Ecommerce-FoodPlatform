import execution from "../config/db.mjs";
import oracledb from "oracledb";

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

// Create new Product Method
const createProduct = async (newProduct) => {
  const params = {
    p_CRUD_TYPE: newProduct.p_CRUD_TYPE,
    p_SUPPLIER_ID: newProduct.p_SUPPLIER_ID,
    p_CATEGORY_ID: newProduct.p_CATEGORY_ID,
    p_NAME: newProduct.p_NAME,
    p_IMAGE_URL: newProduct.p_IMAGE_URL,
    p_WEIGHT: newProduct.p_WEIGHT,
    p_STOCK: newProduct.p_STOCK,
    p_PRICE: newProduct.p_PRICE,
  };

  const query = `
  
    BEGIN
    ProductControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_SUPPLIER_ID  => :p_SUPPLIER_ID,
        p_CATEGORY_ID  => :p_CATEGORY_ID, 
        p_NAME         => :p_NAME,
        p_IMAGE_URL    => :p_IMAGE_URL,
        p_WEIGHT       => :p_WEIGHT,
        p_STOCK        => :p_STOCK,
        p_PRICE        => :p_PRICE
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Product Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 20003) {
      return "Invalid Category ID or Supplier ID for the Product !!";
    } else if (error.errorNum === 20000) {
      return "The values must be greater than 0 !!!";
    } else {
      console.log("Database error :", error);
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
const updateProduct = async (updateFields) => {
  const params = {
    p_CRUD_TYPE: updateFields.p_CRUD_TYPE,
    p_PRODUCT_ID: updateFields.p_PRODUCT_ID,
    p_SUPPLIER_ID: updateFields.p_SUPPLIER_ID,
    p_CATEGORY_ID: updateFields.p_CATEGORY_ID,
    p_NAME: updateFields.p_NAME,
    p_IMAGE_URL: updateFields.p_IMAGE_URL,
    p_WEIGHT: updateFields.p_WEIGHT,
    p_STOCK: updateFields.p_STOCK,
    p_PRICE: updateFields.p_PRICE,
  };

  const query = `
  
    BEGIN
    ProductControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_PRODUCT_ID   => :p_PRODUCT_ID,
        p_SUPPLIER_ID  => :p_SUPPLIER_ID,
        p_CATEGORY_ID  => :p_CATEGORY_ID, 
        p_NAME         => :p_NAME,
        p_IMAGE_URL    => :p_IMAGE_URL,
        p_WEIGHT       => :p_WEIGHT,
        p_STOCK        => :p_STOCK,
        p_PRICE        => :p_PRICE
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Product Updated Successfully ...";
  } catch (error) {
    if (error.errorNum === 20003) {
      return "Invalid Category ID or Supplier ID for the Product !!";
    } else if (error.errorNum === 20000) {
      return "The values must be greater than 0 !!!";
    } else if (error.errorNum === 20001) {
      return "Invalid Product ID !!!";
    } else {
      console.log("Database error :", error);
    }
  }
};

// Delete Product By ID Method
const deleteProduct = async (deleteFields) => {
  const params = {
    p_CRUD_TYPE: deleteFields.p_CRUD_TYPE,
    p_PRODUCT_ID: deleteFields.p_PRODUCT_ID,
  };

  const query = `
  
    BEGIN
    ProductControllerProcedure(
        p_CRUD_TYPE    => :p_CRUD_TYPE,
        p_PRODUCT_ID   => :p_PRODUCT_ID
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Product Deleted Successfully ...";
  } catch (error) {
    if (error.errorNum === 20001) {
      return "Invalid Product ID !!!";
    } else {
      console.log("Database error :", error);
    }
  }
};

// // Get Product details to Frontend Method
const getProductDetails = async () => {
  const query = `
    SELECT 
  PRODUCTS.PRODUCT_ID,
  PRODUCTS.NAME AS product_name,
  PRODUCTS.IMAGE_URL,
  PRODUCTS.WEIGHT,
  PRODUCTS.STOCK,
  PRODUCTS.PRICE,
  CATEGORIES.NAME AS category_name,
  CATEGORIES.DESCRIPTION AS category_description
    FROM 
    PRODUCTS
    LEFT JOIN 
  CATEGORIES ON PRODUCTS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
  `;
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Products Available !!!";
  }
};

const filteredProductDetails = async (filters) => {
  let categoryId = null;

  if (filters.p_CATEGORY_NAME) {
    const categoryQuery = `
      SELECT CATEGORY_ID 
      FROM CATEGORIES 
      WHERE NAME = :p_CATEGORY_NAME
    `;
    const categoryParams = { p_CATEGORY_NAME: filters.p_CATEGORY_NAME };

    try {
      const categoryResponse = await execution(categoryQuery, categoryParams);
      if (categoryResponse.length > 0) {
        categoryId = categoryResponse[0].CATEGORY_ID;
      } else {
        return "Invalid category name provided.";
      }
    } catch (error) {
      console.error("Error resolving category name:", error.message);
      throw error;
    }
  }

  const query = `
    SELECT 
      PRODUCTS.PRODUCT_ID,
      PRODUCTS.NAME AS product_name,
      PRODUCTS.IMAGE_URL,
      PRODUCTS.WEIGHT,
      PRODUCTS.STOCK,
      PRODUCTS.PRICE,
      CATEGORIES.NAME AS category_name,
      CATEGORIES.DESCRIPTION AS category_description
    FROM 
      PRODUCTS
    LEFT JOIN 
      CATEGORIES ON PRODUCTS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
    WHERE 
      (:p_CATEGORY_ID IS NULL OR PRODUCTS.CATEGORY_ID = :p_CATEGORY_ID)
      AND (:p_MIN_PRICE IS NULL OR PRODUCTS.PRICE >= :p_MIN_PRICE)
      AND (:p_MAX_PRICE IS NULL OR PRODUCTS.PRICE <= :p_MAX_PRICE)
      AND (:p_MIN_STOCK IS NULL OR PRODUCTS.STOCK >= :p_MIN_STOCK)
  `;

  const params = {
    p_CATEGORY_ID: categoryId || null,
    p_MIN_PRICE: filters.p_MIN_PRICE || null,
    p_MAX_PRICE: filters.p_MAX_PRICE || null,
    p_MIN_STOCK: filters.p_MIN_STOCK || null,
  };

  try {
    const response = await execution(query, params);
    if (response.length > 0) {
      return response;
    } else {
      return "No products match your filters.";
    }
  } catch (error) {
    console.error("Error in filteredProductDetails:", error.message);
    throw error;
  }
};

export {
  getAllProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
  getProductDetails,
  filteredProductDetails,
};
