
// Supplier Procedures ---------------------------------------------------------

// Supplier availability check
CREATE OR REPLACE PROCEDURE CheckSupplierAvailability(
    p_SUPPLIER_ID IN SUPPLIER.SUPPLIER_ID%TYPE
)
AS
    supplierCount NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO supplierCount
    FROM SUPPLIER
    WHERE SUPPLIER_ID = p_SUPPLIER_ID;

    IF supplierCount = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ID not Found');
        
        
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;






// create new supplier
CREATE OR REPLACE PROCEDURE NewSupplier(
    p_SUPPLIER_ID IN SUPPLIER.SUPPLIER_ID%TYPE,
    p_FULL_NAME IN  SUPPLIER.FULL_NAME%TYPE,
    p_PHONE IN      SUPPLIER.PHONE%TYPE,
    p_ADDRESS IN    SUPPLIER.ADDRESS%TYPE,
    p_IMAGE_URL IN  SUPPLIER.IMAGE_URL%TYPE
)
AS
BEGIN
    INSERT INTO SUPPLIER (SUPPLIER_ID, FULL_NAME, PHONE,ADDRESS,IMAGE_URL)
    VALUES (p_SUPPLIER_ID, p_FULL_NAME, p_PHONE, p_ADDRESS, p_IMAGE_URL);
    COMMIT;
EXCEPTION

    WHEN OTHERS THEN
    
        IF SQLCODE = -2291 THEN
            RAISE_APPLICATION_ERROR(-20001, 'The given Supplier ID does not exist in the referenced table!');
        ELSIF SQLCODE = -1 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Supplier ID already exists!');
            
        ELSIF SQLCODE = -1400 THEN
            RAISE_APPLICATION_ERROR(-20007, 'Null values not accepted!');
            
            
        ELSE
            RAISE;
        END IF;
        
END;


        


// Update the Supplier
CREATE OR REPLACE PROCEDURE UpdateSupplier(
    p_FULL_NAME IN  SUPPLIER.FULL_NAME%TYPE,
    p_PHONE IN      SUPPLIER.PHONE%TYPE,
    p_ADDRESS IN    SUPPLIER.ADDRESS%TYPE,
    p_IMAGE_URL IN  SUPPLIER.IMAGE_URL%TYPE,
    p_SUPPLIER_ID IN SUPPLIER.SUPPLIER_ID%TYPE
)
AS

BEGIN

    CheckSupplierAvailability(p_SUPPLIER_ID);
    
    UPDATE SUPPLIER
    SET FULL_NAME = p_FULL_NAME,
        PHONE = p_PHONE,
        ADDRESS = p_ADDRESS,
        IMAGE_URL = p_IMAGE_URL
    WHERE SUPPLIER_ID = p_SUPPLIER_ID;
    
    COMMIT;
    
    
EXCEPTION

    WHEN OTHERS THEN
    
        IF SQLCODE = -1407 THEN
            RAISE_APPLICATION_ERROR(-20007, 'Null Values are not Accepted!!');
        ELSIF SQLCODE = -1 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Supplier ID already exists!');
            
        ELSE
            RAISE;
        END IF;
    

END;





// Delete the supplier
CREATE OR REPLACE PROCEDURE DeleteSupplier(
    
    p_SUPPLIER_ID IN SUPPLIER.SUPPLIER_ID%TYPE
)
AS

BEGIN

    CheckSupplierAvailability(p_SUPPLIER_ID);
    DELETE FROM SUPPLIER
    WHERE SUPPLIER_ID = p_SUPPLIER_ID;
        
    COMMIT;
    
EXCEPTION

     WHEN OTHERS THEN
    
        IF SQLCODE = -2292 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Foreign key Referenced Error!!');
            
        ELSE
            RAISE;
        END IF;
    

END;







// Supplier Controller Procedure

CREATE OR REPLACE PROCEDURE SupplierControllerProcedure(

    p_CRUD_TYPE   IN VARCHAR2,
    p_SUPPLIER_ID IN SUPPLIER.SUPPLIER_ID%TYPE,
    p_FULL_NAME   IN SUPPLIER.FULL_NAME%TYPE DEFAULT NULL,
    p_PHONE       IN SUPPLIER.PHONE%TYPE DEFAULT NULL,
    p_ADDRESS     IN SUPPLIER.ADDRESS%TYPE DEFAULT NULL,
    p_IMAGE_URL   IN SUPPLIER.IMAGE_URL%TYPE DEFAULT NULL
    
)

AS
BEGIN
    IF p_CRUD_TYPE = 'INSERT' THEN
        
        NewSupplier(p_SUPPLIER_ID,p_FULL_NAME,p_PHONE,p_ADDRESS,p_IMAGE_URL);
        
    ELSIF p_CRUD_TYPE = 'UPDATE' THEN
    
        UpdateSupplier(p_FULL_NAME,p_PHONE,p_ADDRESS,p_IMAGE_URL,p_SUPPLIER_ID);
        
    ELSIF p_CRUD_TYPE = 'DELETE' THEN
    
        DeleteSupplier(p_SUPPLIER_ID);
        
    ELSE
        RAISE_APPLICATION_ERROR(-20000, 'Invalid operation type specified.');

    END IF;
    
END;


select * from supplier;



