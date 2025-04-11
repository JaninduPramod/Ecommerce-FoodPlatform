// Updating status Procedures

// Updating deleivery to delivered
create or replace PROCEDURE UpdateDeliveryStatus(
    p_ORDER_ID  IN  PAYMENTS.ORDER_ID %TYPE
)
AS


    paymentStatus VARCHAR(20);

BEGIN

    UPDATE DELIVERY
    SET   STATUS  = 'Delivered'
    WHERE ORDER_ID = p_ORDER_ID;
    COMMIT;

    SELECT STATUS INTO paymentStatus
    FROM PAYMENTS
    WHERE ORDER_ID= p_ORDER_ID ;

    IF paymentStatus='Done' THEN 
        UPDATE ORDERS
        SET   ORDER_STATUS  = 'Done'
        WHERE ORDER_ID = p_ORDER_ID;
        COMMIT;
    END IF;

EXCEPTION

    WHEN OTHERS THEN

            RAISE;

END;


// updating payment status to Done

create or replace PROCEDURE UpdatePaymentStatus(
    p_ORDER_ID  IN  PAYMENTS.ORDER_ID %TYPE
)
AS


    shippingStatus VARCHAR(20);

BEGIN

    UPDATE PAYMENTS
    SET   STATUS  = 'Done'
    WHERE ORDER_ID = p_ORDER_ID;
    COMMIT;

    SELECT STATUS INTO shippingStatus
    FROM DELIVERY
    WHERE ORDER_ID= p_ORDER_ID ;

    IF shippingStatus='Delivered' THEN 
        UPDATE ORDERS
        SET   ORDER_STATUS  = 'Done'
        WHERE ORDER_ID = p_ORDER_ID;
        COMMIT;
    END IF;

EXCEPTION

    WHEN OTHERS THEN

            RAISE;

END;





















