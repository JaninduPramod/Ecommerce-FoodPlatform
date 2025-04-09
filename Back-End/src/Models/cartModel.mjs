import execution from "../config/db.mjs";
import jwt from "jsonwebtoken";

// Add product to Cart Method
const addToCart = async (newProduct) => {
  try {
    const token = newProduct.token?.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, "urbanEcommerceSecretKey");
    const USER_ID = decoded.userId;

    const params = {
      p_CUSTOMER_ID: USER_ID,
      p_PRODUCT_ID: newProduct.p_PRODUCT_ID,
      p_QUANTITY: newProduct.p_QUANTITY,
    };

    const query = `
      BEGIN
        AddToCart(
            p_CUSTOMER_ID  => :p_CUSTOMER_ID,
            p_PRODUCT_ID   => :p_PRODUCT_ID, 
            p_QUANTITY     => :p_QUANTITY
        );
      END;
    `;

    await execution(query, params);
    return "Added to Cart ...";
  } catch (error) {
    console.error("Cart model error:", error.message);
    throw error;
  }
};

export default addToCart;
