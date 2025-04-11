
// Customer Procedures ---------------------------------------------------------

// Customer availability check
CREATE OR REPLACE PROCEDURE CheckCustomerAvailability(
    p_CUSTOMER_ID IN CUSTOMER.CUSTOMER_ID%TYPE
)
AS
    customerCount NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO customerCount
    FROM CUSTOMER
    WHERE CUSTOMER_ID = p_CUSTOMER_ID;

    IF customerCount = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Customer ID does not exists!');
        
        
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;






// create new customer
CREATE OR REPLACE PROCEDURE NewCustomer(
    p_CUSTOMER_ID IN CUSTOMER.CUSTOMER_ID%TYPE,
    p_FULL_NAME IN  CUSTOMER.FULL_NAME%TYPE,
    p_PHONE IN      CUSTOMER.PHONE%TYPE,
    p_ADDRESS IN    CUSTOMER.ADDRESS%TYPE,
    p_IMAGE_URL IN  CUSTOMER.IMAGE_URL%TYPE
)
AS
BEGIN
    INSERT INTO CUSTOMER (CUSTOMER_ID, FULL_NAME, PHONE, ADDRESS, IMAGE_URL)
    VALUES (p_CUSTOMER_ID, p_FULL_NAME, p_PHONE, p_ADDRESS, p_IMAGE_URL);
    COMMIT;
EXCEPTION

    WHEN OTHERS THEN
    
        IF SQLCODE = -2291 THEN
            RAISE_APPLICATION_ERROR(-20001, 'The given CUSTOMER_ID does not exist in the referenced table!');
        ELSIF SQLCODE = -1 THEN
            RAISE_APPLICATION_ERROR(-20000, 'Customer ID already exists!');
            
            
        ELSE
            RAISE;
        END IF;
        
END;


        


// Update the customer
CREATE OR REPLACE PROCEDURE UpdateCustomer(
    p_FULL_NAME IN  CUSTOMER.FULL_NAME%TYPE,
    p_PHONE IN      CUSTOMER.PHONE%TYPE,
    p_ADDRESS IN    CUSTOMER.ADDRESS%TYPE,
    p_IMAGE_URL IN  CUSTOMER.IMAGE_URL%TYPE,
    p_CUSTOMER_ID IN CUSTOMER.CUSTOMER_ID%TYPE
)
AS

BEGIN

    CheckCustomerAvailability(p_CUSTOMER_ID);
    
    UPDATE CUSTOMER
    SET FULL_NAME = p_FULL_NAME,
        PHONE = p_PHONE,
        ADDRESS = p_ADDRESS,
        IMAGE_URL = p_IMAGE_URL
    WHERE CUSTOMER_ID = p_CUSTOMER_ID;
    
    COMMIT;
    

END;





// Delete the customer
CREATE OR REPLACE PROCEDURE DeleteCustomer(
    
    p_CUSTOMER_ID IN CUSTOMER.CUSTOMER_ID%TYPE
)
AS

BEGIN

    CheckCustomerAvailability(p_CUSTOMER_ID);
    DELETE FROM CUSTOMER
    WHERE CUSTOMER_ID = p_CUSTOMER_ID;
        
    COMMIT;
    

END;







// Controller Procedure

CREATE OR REPLACE PROCEDURE CustomerControllerProcedure(

    p_CRUD_TYPE    IN VARCHAR2,
    p_CUSTOMER_ID IN CUSTOMER.CUSTOMER_ID%TYPE,
    p_FULL_NAME   IN CUSTOMER.FULL_NAME%TYPE DEFAULT NULL,
    p_PHONE       IN CUSTOMER.PHONE%TYPE DEFAULT NULL,
    p_ADDRESS     IN CUSTOMER.ADDRESS%TYPE DEFAULT NULL,
    p_IMAGE_URL   IN CUSTOMER.IMAGE_URL%TYPE DEFAULT NULL
    
)

AS
BEGIN
    IF p_CRUD_TYPE = 'INSERT' THEN
        
        NewCustomer(p_CUSTOMER_ID,p_FULL_NAME,p_PHONE,p_ADDRESS,p_IMAGE_URL);
        
    ELSIF p_CRUD_TYPE = 'UPDATE' THEN
    
        UpdateCustomer(p_FULL_NAME,p_PHONE,p_ADDRESS,p_IMAGE_URL,p_CUSTOMER_ID);
        
    ELSIF p_CRUD_TYPE = 'DELETE' THEN
    
        DeleteCustomer(p_CUSTOMER_ID);
        
    ELSE
        RAISE_APPLICATION_ERROR(-20002, 'Invalid operation type specified.');

    END IF;
    
END;


select * from customer;


BEGIN
    CustomerControllerProcedure(
        p_CRUD_TYPE    => 'UPDATE',        -- Operation type: 'INSERT', 'UPDATE', or 'DELETE'
        p_CUSTOMER_ID => 66,             -- Customer ID
        p_FULL_NAME   => 'Janindu pramod',      -- Full Name
        p_PHONE       => '087554', -- Phone Number
        p_ADDRESS     => 'Dickwella',   -- Address
        p_IMAGE_URL   => 'img123' -- Image URL
    );
END;


































