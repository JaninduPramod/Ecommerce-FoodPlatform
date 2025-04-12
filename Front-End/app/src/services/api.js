// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  try {
    const response = await api.get("/api/v5/allproducts");
    console.log(response);
    return response.data.msg || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const response = await api.get("/api/v1/allcustomers");
    return response.data.data || []; 
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSuppliers = async () => {
  try {
    const response = await api.get("/api/v3/allSuppliers");
    console.log('Suppliers API Response:', response); // Debug log
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching suppliers:", error.response?.data || error.message);
    throw error;
  }
};



export const getFeedback = async () => {
  try {
    const response = await api.get("/api/v6/allFeedbacks");
    return response.data.msg || [];
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
};





// In your api.js file, add these functions:


export const updateProduct = async (productData) => {
  try {
    const response = await api.put("/api/v5/updateProduct", {
      p_CRUD_TYPE: "UPDATE",
      p_PRODUCT_ID: productData.PRODUCT_ID,
      p_SUPPLIER_ID: productData.SUPPLIER_ID,
      p_CATEGORY_ID: productData.CATEGORY_ID,
      p_NAME: productData.NAME,
      p_IMAGE_URL: productData.IMAGE_URL,
      p_WEIGHT: productData.WEIGHT,
      p_STOCK: productData.STOCK,
      p_PRICE: productData.PRICE
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete("/api/v5/deleteProduct", {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        p_CRUD_TYPE: "DELETE",
        p_PRODUCT_ID: productId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error);
    throw error;
  }
};



export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await api.delete("/api/v6/deleteFeedback", { 
      data: { _id: feedbackId } 
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting feedback:", error);
    throw error;
  }
};