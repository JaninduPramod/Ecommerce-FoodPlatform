// Category Procedures ---------------------------------------------------------

// Category availability check
CREATE OR REPLACE PROCEDURE CheckCategoryAvailability(
    p_CATEGORY_ID IN CATEGORIES.CATEGORY_ID%TYPE
)
AS
    categoryCount NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO categoryCount
    FROM CATEGORIES
    WHERE CATEGORY_ID = p_CATEGORY_ID;

    IF categoryCount = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ID not Found');
         
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;




// create new Category
CREATE OR REPLACE PROCEDURE NewCategory(
    p_NAME         IN  CATEGORIES.NAME %TYPE,
    p_DESCRIPTION  IN  CATEGORIES.DESCRIPTION %TYPE
)
AS
BEGIN
    INSERT INTO CATEGORIES (NAME, DESCRIPTION)
    VALUES (p_NAME,p_DESCRIPTION);
    COMMIT;
EXCEPTION

    WHEN OTHERS THEN
    
        RAISE;
           
END;



BEGIN NewCategory(
    p_NAME =>'gemstones',
    p_DESCRIPTION => 'very valuable items on earth'
);
END;

        


// Update the Category
CREATE OR REPLACE PROCEDURE UpdateCategory(
    p_CATEGORY_ID  IN  CATEGORIES.CATEGORY_ID %TYPE,
    p_NAME         IN  CATEGORIES.NAME %TYPE,
    p_DESCRIPTION  IN  CATEGORIES.DESCRIPTION %TYPE
    
)
AS

BEGIN

    CheckCategoryAvailability(p_CATEGORY_ID);
    
    UPDATE CATEGORIES
    SET   NAME        = p_NAME,
          DESCRIPTION = p_DESCRIPTION
    WHERE CATEGORY_ID = p_CATEGORY_ID;
    
    COMMIT;
    
    
EXCEPTION

    WHEN OTHERS THEN

            RAISE;

END;




// Delete the Category
CREATE OR REPLACE PROCEDURE DeleteCategory(
    
    p_CATEGORY_ID IN  CATEGORIES.CATEGORY_ID%TYPE
)
AS

BEGIN

    CheckCategoryAvailability(p_CATEGORY_ID);
    DELETE FROM CATEGORIES
    WHERE CATEGORY_ID = p_CATEGORY_ID;
        
    COMMIT;
    
EXCEPTION

     WHEN OTHERS THEN
    
            RAISE;
    
END;


BEGIN
    DeleteCategory(
        p_CATEGORY_ID  => 21
      );
END;


// Category Controller Procedure

CREATE OR REPLACE PROCEDURE CategoryControllerProcedure(

    p_CRUD_TYPE    IN VARCHAR2,
    p_CATEGORY_ID  IN  CATEGORIES.CATEGORY_ID %TYPE DEFAULT NULL,
    p_NAME         IN  CATEGORIES.NAME %TYPE DEFAULT NULL,
    p_DESCRIPTION  IN  CATEGORIES.DESCRIPTION %TYPE DEFAULT NULL
    
)

AS
BEGIN
    IF p_CRUD_TYPE = 'INSERT' THEN
        
        NewCategory(p_NAME,p_DESCRIPTION);
        
    ELSIF p_CRUD_TYPE = 'UPDATE' THEN
    
        UpdateCategory(p_CATEGORY_ID,p_NAME,p_DESCRIPTION);
        
    ELSIF p_CRUD_TYPE = 'DELETE' THEN
    
        DeleteCategory(p_CATEGORY_ID);
        
    ELSE
        RAISE_APPLICATION_ERROR(-20000, 'Invalid operation type specified.');

    END IF;
    
END;


select * from categories;



begin CategoryControllerProcedure(

    p_CRUD_TYPE     =>'DELETE',  
    p_CATEGORY_ID   =>22

);
END;





// ---------------------------------------------------------------------------------------------






