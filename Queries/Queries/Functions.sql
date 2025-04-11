
// Get full details for a customer By ID
CREATE OR REPLACE FUNCTION getCustomerProfile(p_USER_ID IN NUMBER)
RETURN SYS_REFCURSOR
IS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT 
      USERS.USER_EMAIL as email,
      USERS.USER_PASSWORD as password,
      USERS.USER_ROLE as role,
      CUSTOMER.PHONE as contact,
      CUSTOMER.ADDRESS as address,
      CUSTOMER.FULL_NAME as company
    FROM 
      USERS
    LEFT JOIN 
      CUSTOMER ON USERS.USER_ID = CUSTOMER.CUSTOMER_ID
    WHERE 
      USERS.USER_ID = p_USER_ID;
  
  RETURN v_cursor;
END getCustomerProfile;
/