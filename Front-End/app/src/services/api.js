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
    return response.data.data || []; // Match backend response structure
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSuppliers = async () => {
  try {
    const response = await api.get("/api/v3/allSuppliers");
    return response.data.msg || [];
  } catch (error) {
    console.error("Error fetching suppliers:", error);
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
