--Customers 
CREATE TABLE raw.customers 
( 
    customer_id                VARCHAR(32) NOT NULL, 
    customer_unique_id         VARCHAR(32) NULL, 
    customer_zip_code_prefix   INT NULL, 
    customer_city              NVARCHAR(100) NULL, 
    customer_state             CHAR(2) NULL 
); 
GO 
 
--Orders 
CREATE TABLE raw.orders 
( 
    order_id                       VARCHAR(32) NOT NULL, 
    customer_id                    VARCHAR(32) NULL, 
    order_status                   VARCHAR(30) NULL, 
    order_purchase_timestamp       DATETIME2 NULL, 
    order_approved_at              DATETIME2 NULL, 
    order_delivered_carrier_date   DATETIME2 NULL, 
    order_delivered_customer_date  DATETIME2 NULL, 
    order_estimated_delivery_date  DATETIME2 NULL 
); 
GO 
 
--Order Items 
CREATE TABLE raw.order_items 
( 
    order_id                VARCHAR(32) NOT NULL, 
    order_item_id           INT NULL, 
    product_id              VARCHAR(32) NULL, 
    seller_id               VARCHAR(32) NULL, 
    shipping_limit_date     DATETIME2 NULL, 
    price                   DECIMAL(12,2) NULL, 
    freight_value           DECIMAL(12,2) NULL 
); 
GO 
 
--Order Payments 
CREATE TABLE raw.order_payments 
( 
    order_id                VARCHAR(32) NOT NULL, 
    payment_sequential       INT NULL, 
    payment_type             VARCHAR(30) NULL, 
    payment_installments     INT NULL, 
    payment_value            DECIMAL(12,2) NULL 
); 
GO 
 
--Order Reviews 
CREATE TABLE raw.order_reviews 
( 
    review_id                 VARCHAR(32) NOT NULL, 
    order_id                  VARCHAR(32) NOT NULL, 
    review_score              TINYINT NULL, 
    review_comment_title      NVARCHAR(500) NULL, 
    review_comment_message    NVARCHAR(MAX) NULL, 
    review_creation_date      DATETIME2 NULL, 
    review_answer_timestamp   DATETIME2 NULL 
); 
GO 
 
--Products 
CREATE TABLE raw.products 
( 
    product_id                     VARCHAR(32) NOT NULL, 
    product_category_name         VARCHAR(100) NULL, 
    product_name_lenght           INT NULL, 
    product_description_lenght    INT NULL, 
    product_photos_qty             INT NULL, 
    product_weight_g               INT NULL, 
    product_length_cm              INT NULL, 
    product_height_cm              INT NULL, 
    product_width_cm               INT NULL 
); 
GO 
 
--Sellers 
CREATE TABLE raw.sellers 
( 
    seller_id               VARCHAR(32) NOT NULL, 
    seller_zip_code_prefix  INT NULL, 
    seller_city             NVARCHAR(100) NULL, 
    seller_state            CHAR(2) NULL 
); 
GO 
 
--Geolocation 

CREATE TABLE raw.geolocation 
( 
    geolocation_zip_code_prefix  INT NULL, 
    geolocation_lat               DECIMAL(10,7) NULL, 
    geolocation_lng               DECIMAL(10,7) NULL, 
    geolocation_city              NVARCHAR(100) NULL, 
    geolocation_state             CHAR(2) NULL 
); 
GO  
 
--Category Translation 
CREATE TABLE raw.category_translation 
( 
    product_category_name       VARCHAR(100) NOT NULL, 
    product_category_name_english VARCHAR(100) NULL 
); 
GO 