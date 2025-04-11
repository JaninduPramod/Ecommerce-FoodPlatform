
// Placing an Order

CREATE OR REPLACE PROCEDURE PlaceOrderByCart (
    p_customer_id IN NUMBER
)
IS
    new_order_id NUMBER;
    total_price NUMBER := 0;
BEGIN
   
   SELECT SUM(PRODUCTS.PRICE * CART.QUANTITY)
    INTO total_price
    FROM CART
    JOIN PRODUCTS ON CART.PRODUCT_ID = PRODUCTS.PRODUCT_ID
    WHERE CART.CUSTOMER_ID = p_customer_id;
   
   INSERT INTO ORDERS(CUSTOMER_ID,ORDER_DATE,TOTAL_PRICE)
   VALUES (p_customer_id, SYSDATE,total_price)
   RETURNING ORDER_ID INTO new_order_id;
   COMMIT;
   
   INSERT INTO ORDER_DETAILS (ORDER_ID, PRODUCT_ID, QUANTITY, SUB_TOTAL)
   SELECT new_order_id, CART.PRODUCT_ID, CART.QUANTITY, (CART.QUANTITY * PRODUCTS.PRICE)
   FROM CART
   JOIN PRODUCTS ON CART.PRODUCT_ID = PRODUCTS.PRODUCT_ID
   WHERE CART.CUSTOMER_ID = p_customer_id;

   COMMIT;
   
   
   DELETE FROM CART WHERE CUSTOMER_ID=p_customer_id;
   

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;





BEGIN
    PlaceOrderByCart(
        p_customer_id =>161
    );
END;




select * from cart;

select * from orders;

select * from order_details ;

select * from order_log ;

select * from delivery;

select * from payments;

delete from orders where order_id =89;
update orders set order_status='Cancelled' where order_id=61;

select * from PRODUCTS;

select * from customer;


BEGIN UpdatePaymentStatus(

    p_ORDER_ID => 63

)
;END;

BEGIN UpdateDeliveryStatus(

    p_ORDER_ID => 63

)
;END;



BEGIN AddToCart(
    p_CUSTOMER_ID =>73,
    p_PRODUCT_ID => 53,
    p_QUANTITY => 7
);
END;

BEGIN AddToCart(
    p_CUSTOMER_ID =>73,
    p_PRODUCT_ID => 59,
    p_QUANTITY => 5
);
END;

DELETE FROM CART WHERE CUSTOMER_ID = 67;
COMMIT;


