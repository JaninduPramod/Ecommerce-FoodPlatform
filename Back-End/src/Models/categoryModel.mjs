import execution from "../config/db.mjs";

// // All Categories Method
const getAllCategories = async () => {
  const query = "SELECT * FROM CATEGORIES";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Categories Available !!!";
  }
};

// Create new Category Method
const createCategory = async (newCategory) => {
  const params = {
    p_CRUD_TYPE: newCategory.p_CRUD_TYPE,
    p_NAME: newCategory.p_NAME,
    p_DESCRIPTION: newCategory.p_DESCRIPTION,
  };

  const query = `
  
    BEGIN
    CategoryControllerProcedure(
        p_CRUD_TYPE   => :p_CRUD_TYPE,
        p_NAME        => :p_NAME, 
        p_DESCRIPTION => :p_DESCRIPTION
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Category Created Successfully ...";
  } catch (error) {
    console.log(error);
  }
};

// //  Category by ID Method
const getCategoryByID = async (CATEGORY_ID) => {
  const query = "SELECT * FROM CATEGORIES WHERE CATEGORY_ID = :CATEGORY_ID";
  const response = await execution(query, [CATEGORY_ID]);
  if (response.length <= 0) {
    return "Invalid Category ID !!!";
  } else {
    return response;
  }
};

// Update Category By ID
const updateCategory = async (updateFields) => {
  const params = {
    p_CRUD_TYPE: updateFields.p_CRUD_TYPE,
    p_CATEGORY_ID: updateFields.p_CATEGORY_ID,
    p_NAME: updateFields.p_NAME,
    p_DESCRIPTION: updateFields.p_DESCRIPTION,
  };

  const query = `
  
    BEGIN
    CategoryControllerProcedure(
        p_CRUD_TYPE   => :p_CRUD_TYPE,
        p_CATEGORY_ID => :p_CATEGORY_ID,
        p_NAME        => :p_NAME, 
        p_DESCRIPTION => :p_DESCRIPTION
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Category Updated Successfully ...";
  } catch (error) {
    console.log(error);
    if (error.errorNum === 20001) {
      return "Invalid Category ID !!!";
    }
  }
};

// Delete Supplier By ID Method
const deleteCategory = async (deleteFields) => {
  const params = {
    p_CRUD_TYPE: deleteFields.p_CRUD_TYPE,
    p_CATEGORY_ID: deleteFields.p_CATEGORY_ID,
  };

  const query = `
  
    BEGIN
    CategoryControllerProcedure(
        p_CRUD_TYPE   => :p_CRUD_TYPE,
        p_CATEGORY_ID => :p_CATEGORY_ID
      );
    END;
  `;

  try {
    await execution(query, params);
    return "Category Deleted Successfully ...";
  } catch (error) {
    console.log(error);
    if (error.errorNum === 20001) {
      return "Invalid Category ID !!!";
    }
  }
};

// Get Category Names for FrontEnd Method
const getAllCategoryNames = async () => {
  const query = "SELECT NAME FROM CATEGORIES";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No Categories Available !!!";
  }
};

export {
  getAllCategories,
  createCategory,
  getCategoryByID,
  updateCategory,
  deleteCategory,
  getAllCategoryNames,
};
