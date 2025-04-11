import execution from "../config/db.mjs";
import oracledb from "oracledb";

// Add product to Cart Method
export const addToCart = async (newProduct) => {
  try {
    const params = {
      p_CUSTOMER_ID: newProduct.p_USER_ID,
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

// Get cart Products Method
export const getMyProducts = async (IncomingData) => {
  const query = `
  SELECT 
    CART.CART_ID,
    CART.CUSTOMER_ID,
    CART.PRODUCT_ID,
    CART.QUANTITY,
    PRODUCTS.NAME AS PRODUCT_NAME,
    PRODUCTS.PRICE AS PRODUCT_PRICE
  FROM CART
  INNER JOIN PRODUCTS ON CART.PRODUCT_ID = PRODUCTS.PRODUCT_ID
  WHERE CART.CUSTOMER_ID = :CUSTOMER_ID
`;
  const response = await execution(query, [IncomingData.p_USER_ID]);
  if (response.length <= 0) {
    return "No products added to Cart ...";
  } else {
    return response;
  }
};

// Delete Cart Item By Cart ID Method
export const deleteCartItem = async (CART_ID) => {
  const query = `DELETE FROM CART WHERE CART_ID = :CART_ID `;

  try {
    await execution(query, [CART_ID]);
    return "Item Removed Successfully ...";
  } catch (error) {
    if (error.errorNum === 20001) {
      return "Invalid Cart ID !!!";
    } else {
      console.log("Database error :", error);
    }
  }
};

// Customer Place Order Method
export const placeOrderFor = async (CUSTOMER_ID) => {
  const query = `
    BEGIN
    PlaceOrderByCart(
        p_customer_id =>:CUSTOMER_ID
      );
    END; `;

  try {
    await execution(query, [CUSTOMER_ID]);
    return "Successfully Placed order ...";
  } catch (error) {
    if (error.errorNum === 20001) {
      return "Failed to order!!!";
    } else {
      console.log("Database error :", error);
    }
  }
};

export default { addToCart, getMyProducts, deleteCartItem, placeOrderFor };
