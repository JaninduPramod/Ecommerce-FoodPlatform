import execution from "../config/db.mjs";

// Get Customer Orders Method
export const getMyOrders = async (IncomingData) => {
  const query = `
    SELECT 
    ORDERS.ORDER_ID,
    ORDERS.TOTAL_PRICE,
    PAYMENTS.STATUS AS PAYMENT_STATUS,
    TO_CHAR(DELIVERY.ESTIMATED_DATE, 'YYYY-MM-DD') AS ESTIMATED_DATE
    FROM 
    ORDERS
        LEFT JOIN 
    PAYMENTS ON ORDERS.ORDER_ID = PAYMENTS.ORDER_ID
    LEFT JOIN 
    DELIVERY ON ORDERS.ORDER_ID = DELIVERY.ORDER_ID
        WHERE 
    ORDERS.CUSTOMER_ID = :customer_id

  `;
  const response = await execution(query, [IncomingData.p_USER_ID]);
  if (response.length <= 0) {
    return "No Orders have Been Placed  ...";
  } else {
    return response;
  }
};

export default { getMyOrders };
