
// User Procedures ---------------------------------------------------------

// User availability check
CREATE OR REPLACE PROCEDURE CheckUserAvailability(
    p_USER_ID IN USERS.USER_ID%TYPE
)
AS
    userCount NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO userCount
    FROM USERS
    WHERE USER_ID = p_USER_ID;

    IF userCount = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ID not Found');
        
        
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;





// create new USER
CREATE OR REPLACE PROCEDURE NewUser(
    p_USER_ROLE IN  USERS.USER_ROLE%TYPE,
    p_USER_NAME IN      USERS.USER_NAME%TYPE,
    p_USER_EMAIL IN    USERS.USER_EMAIL%TYPE,
    p_USER_PASSWORD IN  USERS.USER_PASSWORD%TYPE
)
AS
BEGIN
    INSERT INTO USERS (USER_ROLE, USER_NAME, USER_EMAIL,USER_PASSWORD)
    VALUES (p_USER_ROLE, p_USER_NAME, p_USER_EMAIL, p_USER_PASSWORD);
    COMMIT;
EXCEPTION

    WHEN OTHERS THEN
        
        IF SQLCODE = -1 THEN
            RAISE_APPLICATION_ERROR(-20002, 'User Email Already Exists!');
            
        ELSIF SQLCODE = -2290 THEN
            RAISE_APPLICATION_ERROR(-20000, 'Invalid User Role!');
            
        ELSIF SQLCODE = -1400 THEN
            RAISE_APPLICATION_ERROR(-20007, 'Null Values are not Accepted!');
            
        ELSE
            RAISE;
        
        END IF;
END;


        


// Update the User
CREATE OR REPLACE PROCEDURE UpdateUser(
    p_USER_ID   IN  USERS.USER_ID%TYPE,
    p_USER_ROLE IN  USERS.USER_ROLE%TYPE,
    p_USER_NAME IN      USERS.USER_NAME%TYPE,
    p_USER_EMAIL IN    USERS.USER_EMAIL%TYPE,
    p_USER_PASSWORD IN  USERS.USER_PASSWORD%TYPE
)
AS

BEGIN

    CheckUserAvailability(p_USER_ID);
    
    UPDATE USERS
    SET USER_ROLE = p_USER_ROLE,
        USER_NAME = p_USER_NAME,
        USER_EMAIL = p_USER_EMAIL,
        USER_PASSWORD = p_USER_PASSWORD
    WHERE USER_ID = p_USER_ID;
    
    COMMIT;
    
    
EXCEPTION

    WHEN OTHERS THEN
    
        IF SQLCODE = -1407 THEN
            RAISE_APPLICATION_ERROR(-20007, 'Null Values are not Accepted!!');
        ELSIF SQLCODE = -1 THEN
            RAISE_APPLICATION_ERROR(-20002, 'User Email Already Exists!');
        ELSIF SQLCODE = -2290 THEN
            RAISE_APPLICATION_ERROR(-20000, 'Invalid User Role!');
            
        ELSE
            RAISE;
        END IF;
    

END;





// Delete the User
CREATE OR REPLACE PROCEDURE DeleteUser(
    
    p_USER_ID IN  USERS.USER_ID%TYPE
)
AS

BEGIN

    CheckUserAvailability(p_USER_ID);
    DELETE FROM USERS
    WHERE USER_ID = p_USER_ID;
        
    COMMIT;
    
EXCEPTION

     WHEN OTHERS THEN
    
        IF SQLCODE = -2292 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Foreign key Referenced Error!!');
            
        ELSE
            RAISE;
        END IF;
    

END;





// Users Controller Procedure

CREATE OR REPLACE PROCEDURE UsersControllerProcedure(

    p_CRUD_TYPE   IN VARCHAR2,
    p_USER_ID   IN  USERS.USER_ID%TYPE DEFAULT NULL,
    p_USER_ROLE IN  USERS.USER_ROLE%TYPE DEFAULT NULL,
    p_USER_NAME IN      USERS.USER_NAME%TYPE DEFAULT NULL,
    p_USER_EMAIL IN    USERS.USER_EMAIL%TYPE DEFAULT NULL,
    p_USER_PASSWORD IN  USERS.USER_PASSWORD%TYPE DEFAULT NULL
    
)

AS
BEGIN
    IF p_CRUD_TYPE = 'INSERT' THEN
        
        NewUser(p_USER_ROLE,p_USER_NAME,p_USER_EMAIL,p_USER_PASSWORD);
        
    ELSIF p_CRUD_TYPE = 'UPDATE' THEN
    
        UpdateUser(p_USER_ID,p_USER_ROLE,p_USER_NAME,p_USER_EMAIL,p_USER_PASSWORD);
        
    ELSIF p_CRUD_TYPE = 'DELETE' THEN
    
        DeleteUser(p_USER_ID);
        
    ELSE
        RAISE_APPLICATION_ERROR(-20000, 'Invalid operation type specified.');

    END IF;
    
END;


select * from customer;


// ---------------------------------------------------------------------------------------------



























