import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  getCategoryByID,
  updateCategory,
  deleteCategory,
} from "../Models/categoryModel.mjs";
const CategoriesRoute = Router();

// // API for fetch ALL Categories
CategoriesRoute.get("/api/v4/allCategories", async (_, res) => {
  const response = await getAllCategories();

  res.status(200).json({ data: response });
});

// Create new Category
CategoriesRoute.post("/api/v4/newCategory", async (req, res) => {
  const { NAME, DESCRIPTION } = req.body;

  const newCategory = {
    NAME,
    DESCRIPTION,
  };

  const response = await createCategory(newCategory);

  res.status(200).json({ msg: response });
});

// // Fetching Category by ID
CategoriesRoute.post("/api/v4/category-byid", async (req, res) => {
  const { CATEGORY_ID } = req.body;

  const response = await getCategoryByID(CATEGORY_ID);

  res.status(200).json({ msg: response });
});

// Update Category By ID
CategoriesRoute.put("/api/v4/updateCategory", async (req, res) => {
  const { CATEGORY_ID, NAME, DESCRIPTION } = req.body;

  const updateFields = { NAME, DESCRIPTION };

  const response = await updateCategory(CATEGORY_ID, updateFields);

  res.status(200).json({ msg: response });
});

// Delete Category By ID
CategoriesRoute.delete("/api/v4/deleteCategory", async (req, res) => {
  const { CATEGORY_ID } = req.body;

  const response = await deleteCategory(CATEGORY_ID);
  res.status(200).json({ msg: response });
});

export default CategoriesRoute;
