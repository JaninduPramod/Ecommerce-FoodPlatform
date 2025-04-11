import execution from "../config/db.mjs";

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

export default { addToCart, getMyProducts };
