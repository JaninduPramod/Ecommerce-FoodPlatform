// User Triggers


// Handling the user Role Changing 

CREATE OR REPLACE TRIGGER trg_UserRoleChange
AFTER UPDATE ON USERS
FOR EACH ROW
BEGIN
    
    IF :OLD.USER_ROLE != :NEW.USER_ROLE THEN
       
        IF :NEW.USER_ROLE = 'customer' THEN
            DELETE FROM SUPPLIER WHERE SUPPLIER_ID = :NEW.USER_ID;
            INSERT INTO CUSTOMER (CUSTOMER_ID) VALUES (:NEW.USER_ID);
        
        ELSIF :NEW.USER_ROLE = 'supplier' THEN
            DELETE FROM CUSTOMER WHERE CUSTOMER_ID = :NEW.USER_ID;
            INSERT INTO SUPPLIER (SUPPLIER_ID) VALUES (:NEW.USER_ID);
        END IF;
    END IF;
END;



// handling user insert according to the user_role

CREATE OR REPLACE TRIGGER trg_InsertUserByRole
AFTER INSERT ON USERS
FOR EACH ROW
BEGIN
    IF :NEW.USER_ROLE = 'customer' THEN
        INSERT INTO CUSTOMER (CUSTOMER_ID) VALUES (:NEW.USER_ID);
    
    ELSIF :NEW.USER_ROLE = 'supplier' THEN
        INSERT INTO SUPPLIER (SUPPLIER_ID) VALUES (:NEW.USER_ID);
    END IF;
END;



// Triggers after Placing a Order

// Trigger for creating the payment
CREATE OR REPLACE TRIGGER trg_InsertPayment
AFTER INSERT ON ORDERS
FOR EACH ROW
BEGIN
  INSERT INTO PAYMENTS (ORDER_ID, TOTAL_PRICE)
  VALUES (:NEW.ORDER_ID, :NEW.TOTAL_PRICE);
END;



// trigger for creating the delivery
CREATE OR REPLACE TRIGGER trg_CreateDelivery
AFTER INSERT ON ORDERS
FOR EACH ROW
BEGIN
  INSERT INTO DELIVERY (ORDER_ID, STATUS, ESTIMATED_DATE)
  VALUES (:NEW.ORDER_ID, 'Processing', SYSDATE + 3);
END;



// trigger for log Deleted Order details
CREATE OR REPLACE TRIGGER trg_DeletedOrders
BEFORE DELETE ON ORDERS
FOR EACH ROW
BEGIN
    INSERT INTO Order_Log (
        ORDER_ID,
        CUSTOMER_ID,
        ORDER_DATE,
        TOTAL_PRICE
    )
    VALUES (
        :OLD.ORDER_ID,
        :OLD.CUSTOMER_ID,
        :OLD.ORDER_DATE,
        :OLD.TOTAL_PRICE
    );
END;





















