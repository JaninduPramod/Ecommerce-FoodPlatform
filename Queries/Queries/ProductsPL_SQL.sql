// Product Procedures ---------------------------------------------------------

// Product availability check
CREATE OR REPLACE PROCEDURE CheckProductAvailability(
    p_PRODUCT_ID IN PRODUCTS.PRODUCT_ID%TYPE
)
AS
    productCount NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO productCount
    FROM PRODUCTS
    WHERE PRODUCT_ID = p_PRODUCT_ID;

    IF productCount = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ID not Found');
         
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;




// create new Product
CREATE OR REPLACE PROCEDURE NewProduct(
    p_SUPPLIER_ID  IN  PRODUCTS.SUPPLIER_ID %TYPE,
    p_CATEGORY_ID  IN  PRODUCTS.CATEGORY_ID %TYPE,
    p_NAME         IN  PRODUCTS.NAME %TYPE,
    p_IMAGE_URL    IN  PRODUCTS.IMAGE_URL %TYPE,
    p_WEIGHT       IN  PRODUCTS.WEIGHT %TYPE,
    p_STOCK        IN  PRODUCTS.STOCK %TYPE,
    p_PRICE        IN  PRODUCTS.PRICE %TYPE
)
AS
BEGIN
    INSERT INTO PRODUCTS (SUPPLIER_ID, CATEGORY_ID, NAME,IMAGE_URL,WEIGHT,STOCK,PRICE)
    VALUES (p_SUPPLIER_ID, p_CATEGORY_ID, p_NAME, p_IMAGE_URL,p_WEIGHT,p_STOCK,p_PRICE);
    COMMIT;
EXCEPTION

    WHEN OTHERS THEN
    
        IF SQLCODE = -2291 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Invalid Category ID or Supplier ID for the Product !!');
            
        ELSIF SQLCODE = -2290 THEN
            RAISE_APPLICATION_ERROR(-20000, 'Values should be Greater than 0 !!');
        
        ELSE
            RAISE;
        END IF;
        
END;



        


// Update the Product
CREATE OR REPLACE PROCEDURE UpdateProduct(
    p_PRODUCT_ID   IN  PRODUCTS.PRODUCT_ID %TYPE,
    p_SUPPLIER_ID  IN  PRODUCTS.SUPPLIER_ID %TYPE,
    p_CATEGORY_ID  IN  PRODUCTS.CATEGORY_ID %TYPE,
    p_NAME         IN  PRODUCTS.NAME %TYPE,
    p_IMAGE_URL    IN  PRODUCTS.IMAGE_URL %TYPE,
    p_WEIGHT       IN  PRODUCTS.WEIGHT %TYPE,
    p_STOCK        IN  PRODUCTS.STOCK %TYPE,
    p_PRICE        IN  PRODUCTS.PRICE %TYPE
)
AS

BEGIN

    CheckProductAvailability(p_PRODUCT_ID);
    
    UPDATE PRODUCTS
    SET SUPPLIER_ID = p_SUPPLIER_ID,
        CATEGORY_ID = p_CATEGORY_ID,
        NAME = p_NAME,
        IMAGE_URL = p_IMAGE_URL,
        WEIGHT = p_WEIGHT,
        STOCK = p_STOCK,
        PRICE = p_PRICE
    WHERE PRODUCT_ID = p_PRODUCT_ID;
    
    COMMIT;
    
    
EXCEPTION

    WHEN OTHERS THEN
    
        IF SQLCODE = -2291 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Invalid Category ID or Supplier ID for the Product !!');
            
        ELSIF SQLCODE = -2290 THEN
            RAISE_APPLICATION_ERROR(-20000, 'Values should be Greater than 0 !!');
        
        ELSE
            RAISE;
        END IF;
    

END;


BEGIN
    DeleteProduct(
        p_PRODUCT_ID     => 21,
        p_SUPPLIER_ID     => 74,
        p_CATEGORY_ID     => 3, 
        p_NAME     => 'Kottu',
        p_IMAGE_URL => 'IMAGE2',
        p_WEIGHT => 8,
        p_STOCK =>2,
        p_PRICE => 620
      );
END;




// Delete the Product
CREATE OR REPLACE PROCEDURE DeleteProduct(
    
    p_PRODUCT_ID IN  PRODUCTS.PRODUCT_ID%TYPE
)
AS

BEGIN

    CheckProductAvailability(p_PRODUCT_ID);
    DELETE FROM PRODUCTS
    WHERE PRODUCT_ID = p_PRODUCT_ID;
        
    COMMIT;
    
EXCEPTION

     WHEN OTHERS THEN
    
            RAISE;
    
END;





// Product Controller Procedure

CREATE OR REPLACE PROCEDURE ProductControllerProcedure(

    p_CRUD_TYPE    IN VARCHAR2,
    p_PRODUCT_ID   IN  PRODUCTS.PRODUCT_ID %TYPE DEFAULT NULL,
    p_SUPPLIER_ID  IN  PRODUCTS.SUPPLIER_ID %TYPE DEFAULT NULL,
    p_CATEGORY_ID  IN  PRODUCTS.CATEGORY_ID %TYPE DEFAULT NULL,
    p_NAME         IN  PRODUCTS.NAME %TYPE DEFAULT NULL,
    p_IMAGE_URL    IN  PRODUCTS.IMAGE_URL %TYPE DEFAULT NULL,
    p_WEIGHT       IN  PRODUCTS.WEIGHT %TYPE DEFAULT NULL,
    p_STOCK        IN  PRODUCTS.STOCK %TYPE DEFAULT NULL,
    p_PRICE        IN  PRODUCTS.PRICE %TYPE DEFAULT NULL
    
)

AS
BEGIN
    IF p_CRUD_TYPE = 'INSERT' THEN
        
        NewProduct(p_SUPPLIER_ID,p_CATEGORY_ID,p_NAME,p_IMAGE_URL,p_WEIGHT,p_STOCK,p_PRICE);
        
    ELSIF p_CRUD_TYPE = 'UPDATE' THEN
    
        UpdateProduct(p_PRODUCT_ID,p_SUPPLIER_ID,p_CATEGORY_ID,p_NAME,p_IMAGE_URL,p_WEIGHT,p_STOCK,p_PRICE);
        
    ELSIF p_CRUD_TYPE = 'DELETE' THEN
    
        DeleteProduct(p_PRODUCT_ID);
        
    ELSE
        RAISE_APPLICATION_ERROR(-20000, 'Invalid operation type specified.');

    END IF;
    
END;








// ---------------------------------------------------------------------------------------------






