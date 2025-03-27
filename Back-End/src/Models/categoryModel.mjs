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
    NAME: newCategory.NAME,
    DESCRIPTION: newCategory.DESCRIPTION,
  };

  const query = `
        INSERT INTO CATEGORIES (NAME, DESCRIPTION)
        VALUES (:NAME, :DESCRIPTION)
      `;

  try {
    await execution(query, params);
    return "Category Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 1) {
      return "Category Already Exists !!!";
    }
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
const updateCategory = async (CATEGORY_ID, updateFields) => {
  const query = `
          UPDATE CATEGORIES
          SET NAME = :NAME,
              DESCRIPTION = :DESCRIPTION
              
          WHERE CATEGORY_ID = :CATEGORY_ID
        `;

  const params = [updateFields.NAME, updateFields.DESCRIPTION, CATEGORY_ID];

  try {
    const categoryAvailablity = await getCategoryByID(CATEGORY_ID);
    if (
      !categoryAvailablity ||
      categoryAvailablity == "Invalid Category ID !!!"
    ) {
      return "Invalid Category ID !!!";
    } else {
      await execution(query, params);
      return "Category Updated Successfully ...";
    }
  } catch (error) {
    console.log("Database Error:", error);
  }
};

// Delete Supplier By ID Method
const deleteCategory = async (CATEGORY_ID) => {
  const query = "DELETE FROM CATEGORIES WHERE CATEGORY_ID = :CATEGORY_ID";

  try {
    const categoryAvailablity = await getCategoryByID(CATEGORY_ID);
    if (
      !categoryAvailablity ||
      categoryAvailablity == "Invalid Category ID !!!"
    ) {
      return "Invalid Category ID !!!";
    } else {
      await execution(query, [CATEGORY_ID]);
      return "Category Deleted Successfully ...";
    }
  } catch (error) {
    console.log("Database error :", error);
  }
};

export {
  getAllCategories,
  createCategory,
  getCategoryByID,
  updateCategory,
  deleteCategory,
};
