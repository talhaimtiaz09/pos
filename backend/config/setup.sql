BEGIN;

-- Drop all tables if they exist
DROP SCHEMA IF EXISTS public CASCADE;

-- Recreate the public schema
CREATE SCHEMA IF NOT EXISTS public;
-- Drop tables if they exist
DROP TABLE IF EXISTS public.accounts CASCADE;
DROP TABLE IF EXISTS public.account_categories CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.company_bookings CASCADE;
DROP TABLE IF EXISTS public.company_sales_reps CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.expenses CASCADE;
DROP TABLE IF EXISTS public.expense_categories CASCADE;
DROP TABLE IF EXISTS public.damages CASCADE;
DROP TABLE IF EXISTS public.inventory CASCADE;
DROP TABLE IF EXISTS public.inventory_records CASCADE;
DROP TABLE IF EXISTS public.inventory_items CASCADE;
-- DROP TABLE IF EXISTS public.inventory_locations CASCADE;
DROP TABLE IF EXISTS public.batch_locations CASCADE;
DROP TABLE IF EXISTS public.credit_payment CASCADE;
DROP TABLE IF EXISTS public.weekly_analytics CASCADE;
DROP TABLE IF EXISTS public.product_categories CASCADE;
DROP TABLE IF EXISTS public.product_subcategories CASCADE;
DROP TABLE IF EXISTS public.product_units CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.product_batches CASCADE;
DROP TABLE IF EXISTS public.sales CASCADE;
DROP TABLE IF EXISTS public.sales_types CASCADE;
DROP TABLE IF EXISTS public.stakeholder CASCADE;
DROP TABLE IF EXISTS public.stakeholder_categories CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.stock CASCADE;
DROP TABLE IF EXISTS public.credit_sales CASCADE;
DROP TABLE IF EXISTS public.batch_details CASCADE;

-- Create account categories table
CREATE TABLE IF NOT EXISTS public.account_categories (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

-- Create product categories table
CREATE TABLE IF NOT EXISTS public.product_categories (
    id serial PRIMARY KEY,
    category_name varchar(255) NOT NULL UNIQUE
);

-- Create product subcategories table
CREATE TABLE IF NOT EXISTS public.product_subcategories (
    id serial PRIMARY KEY,
    subcategory_name varchar(255) NOT NULL UNIQUE,
    category_id integer NOT NULL,
    FOREIGN KEY (category_id) REFERENCES public.product_categories (id)
);

-- Create product units table
CREATE TABLE IF NOT EXISTS public.product_units (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    category integer,
    subcategory integer,
    FOREIGN KEY (category) REFERENCES public.product_categories (id),
    FOREIGN KEY (subcategory) REFERENCES public.product_subcategories (id)
);

-- Create stakeholder categories table
CREATE TABLE IF NOT EXISTS public.stakeholder_categories (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

-- Create stakeholder table
CREATE TABLE IF NOT EXISTS public.stakeholder (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    contact varchar(15),
    address text,
    category integer,
    FOREIGN KEY (category) REFERENCES public.stakeholder_categories (id)
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    category_id integer,
    sub_category_id integer,
    short_name varchar(50),
    creation_date timestamp DEFAULT CURRENT_TIMESTAMP,
    update_date timestamp,
    unit_id integer,
    supplier_id integer,
    FOREIGN KEY (category_id) REFERENCES public.product_categories (id),
    FOREIGN KEY (sub_category_id) REFERENCES public.product_subcategories (id),
    FOREIGN KEY (unit_id) REFERENCES public.product_units (id),
    FOREIGN KEY (supplier_id) REFERENCES public.companies (id)
);



-- Create inventory table
CREATE TABLE IF NOT EXISTS public.inventory (
    id serial PRIMARY KEY,
    inventory_name varchar(255) NOT NULL UNIQUE
);

-- -- Create inventory locations table
-- CREATE TABLE IF NOT EXISTS public.inventory_locations (
--     id serial PRIMARY KEY,
--     location_name varchar(255) NOT NULL UNIQUE
-- );

-- Create product batches table
CREATE TABLE IF NOT EXISTS public.product_batches (
    id serial PRIMARY KEY,
    quantity numeric(10, 2) NOT NULL CHECK (quantity >= 0),
    product_id integer NOT NULL,
    purchase_price numeric(10, 2) NOT NULL,
    is_active boolean DEFAULT TRUE,
    -- location_id integer,
    inventory_id integer,
    FOREIGN KEY (product_id) REFERENCES public.products (id),
    -- FOREIGN KEY (location_id) REFERENCES public.inventory_locations (id),
    FOREIGN KEY (inventory_id) REFERENCES public.inventory (id)
);

-- Create batch details table
CREATE TABLE IF NOT EXISTS public.batch_details (
    id serial PRIMARY KEY,
    batch_id integer NOT NULL UNIQUE,
    batch_number varchar(50) NOT NULL UNIQUE,
    manufacture_date date DEFAULT NULL,
    expiry_date date,
    FOREIGN KEY (batch_id) REFERENCES public.product_batches (id)
);

-- Create inventory records table
CREATE TABLE IF NOT EXISTS public.inventory_records (
    id serial PRIMARY KEY,
    batch_id integer NOT NULL,
    quantity numeric(10, 2) NOT NULL CHECK (quantity > 0),
    record_type varchar(50) NOT NULL CHECK (record_type IN ('IN', 'OUT', 'ADJUSTMENT','DAMAGED')),
    record_date timestamp DEFAULT CURRENT_TIMESTAMP,
    inventory_id integer,
    FOREIGN KEY (batch_id) REFERENCES public.product_batches (id),
    FOREIGN KEY (inventory_id) REFERENCES public.inventory (id)
);





-- Create accounts table
CREATE TABLE IF NOT EXISTS public.accounts (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    category integer NOT NULL,
    min_limit numeric(10, 2) DEFAULT NULL,
    max_limit numeric(10, 2) DEFAULT NULL,
    balance numeric(10, 2) DEFAULT 0,
    owner_id integer,
    FOREIGN KEY (owner_id) REFERENCES public.stakeholder (id),
    FOREIGN KEY (category) REFERENCES public.account_categories (id)
);

-- Create company bookings table
CREATE TABLE IF NOT EXISTS public.company_bookings (
    id serial PRIMARY KEY,
    company_id integer,
    amount numeric(10, 2) NOT NULL,
    quantity numeric(10, 2) NOT NULL,
    product_id integer,
    booking_date timestamp DEFAULT CURRENT_TIMESTAMP,
    is_pending boolean DEFAULT TRUE,
    FOREIGN KEY (company_id) REFERENCES public.companies (id),
    FOREIGN KEY (product_id) REFERENCES public.products (id)
);

-- Create company sales representatives table
CREATE TABLE IF NOT EXISTS public.company_sales_reps (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    contact varchar(15),
    address text,
    company_id integer,
    FOREIGN KEY (company_id) REFERENCES public.companies (id)
);

-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    address text,
    phone varchar(15) NOT NULL UNIQUE
);

-- Create sales table
CREATE TABLE IF NOT EXISTS public.sales (
    id serial PRIMARY KEY,
    date timestamp DEFAULT CURRENT_TIMESTAMP,
    customer_id integer,
    product_id integer,
    quantity numeric(10, 2) NOT NULL,
    account_id integer,
    price numeric(10, 2) NOT NULL,
    stakeholder_id integer,
    is_pending boolean DEFAULT FALSE,
    batch_id integer,
    FOREIGN KEY (batch_id) REFERENCES public.product_batches (id),
    FOREIGN KEY (customer_id) REFERENCES public.customers (id),
    FOREIGN KEY (product_id) REFERENCES public.products (id),
    FOREIGN KEY (account_id) REFERENCES public.accounts (id),
    FOREIGN KEY (stakeholder_id) REFERENCES public.stakeholder (id)
);



-- Create credit payment table
CREATE TABLE IF NOT EXISTS public.credit_payment (
    id serial PRIMARY KEY,
    sale_id integer,
    amount_left numeric(10, 2) NOT NULL,
    amount_paid numeric(10, 2) NOT NULL,
    payment_date timestamp DEFAULT CURRENT_TIMESTAMP,
    account_id integer,
    FOREIGN KEY (account_id) REFERENCES public.accounts (id),
    FOREIGN KEY (sale_id) REFERENCES public.sales (id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id serial PRIMARY KEY,
    date timestamp DEFAULT CURRENT_TIMESTAMP,
    amount numeric(10, 2) NOT NULL,
    transaction_type varchar(50) NOT NULL CHECK (transaction_type IN ('TRANSFER', 'DEPOSIT','WITHDRAWAL')),
    from_account_id integer NOT NULL,
    to_account_id integer NOT NULL,
    FOREIGN KEY (from_account_id) REFERENCES public.accounts (id),
    FOREIGN KEY (to_account_id) REFERENCES public.accounts (id)
);






-- Create damages table
CREATE TABLE IF NOT EXISTS public.product_damages (
    id serial PRIMARY KEY,
    quantity numeric(10, 2) NOT NULL,
    damage_date date DEFAULT CURRENT_TIMESTAMP,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES public.products (id)
);

-- Create expense categories table
CREATE TABLE IF NOT EXISTS public.expense_categories (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
    id serial PRIMARY KEY,
    date timestamp DEFAULT CURRENT_TIMESTAMP,
    amount numeric(10, 2) NOT NULL,
    category_id integer,
    account_id integer,
    description text,
    FOREIGN KEY (category_id) REFERENCES public.expense_categories (id),
    FOREIGN KEY (account_id) REFERENCES public.accounts (id)
);











-- Insert data into account_categories
INSERT INTO public.account_categories (name) VALUES
('Assets'),
('Liabilities'),
('Equity'),
('Revenue'),
('Expenses');

-- Insert data into product_categories
INSERT INTO public.product_categories (category_name) VALUES
('Electronics'),
('Clothing'),
('Food & Beverages'),
('Furniture'),
('Stationery');

-- Insert data into product_subcategories
INSERT INTO public.product_subcategories (subcategory_name, category_id) VALUES
('Mobile Phones', 1),
('Men Clothing', 2),
('Dairy Products', 3),
('Office Chairs', 4),
('Notebooks', 5);

-- Insert data into product_units
INSERT INTO public.product_units (name) VALUES
('Piece'),
('Kilogram'),
('Liter'),
('Pack'),
('Box');

-- Insert data into companies
INSERT INTO public.companies (name, category, subcategory) VALUES
('Tech Solutions', 1, 1),
('Stylish Wear', 2, 2),
('Fresh Foods', 3, 3),
('Comfort Furniture', 4, 4),
('Paper World', 5, 5);

-- Insert data into stakeholder_categories
INSERT INTO public.stakeholder_categories (name) VALUES
('Supplier'),
('Customer'),
('Employee'),
('Partner'),
('Contractor');

-- Insert data into stakeholder
INSERT INTO public.stakeholder (name, contact, address, category) VALUES
('Ali Khan', '03001234567', 'Karachi, Sindh', 1),
('Ayesha Ahmed', '03214567890', 'Lahore, Punjab', 2),
('Umer Farooq', '03331234567', 'Islamabad, ICT', 3),
('Sana Sheikh', '03451234567', 'Multan, Punjab', 4),
('Bilal Hussain', '03121234567', 'Quetta, Balochistan', 5);

-- Insert data into products
INSERT INTO public.products (name, category_id, sub_category_id, short_name, unit_id, supplier_id) VALUES
('iPhone 13', 1, 1, 'iPhone', 1, 1),
('Men T-Shirt', 2, 2, 'T-Shirt', 1, 2),
('Milk 1L', 3, 3, 'Milk', 3, 3),
('Office Chair', 4, 4, 'Chair', 1, 4),
('A4 Notebook', 5, 5, 'Notebook', 5, 5);

-- Insert data into inventory
INSERT INTO public.inventory (inventory_name) VALUES
('Main Warehouse'),
('Secondary Warehouse'),
('Outlet 1'),
('Outlet 2'),
('Outlet 3');

-- -- Insert data into inventory_locations
-- INSERT INTO public.inventory_locations (location_name) VALUES
-- ('Karachi Warehouse'),
-- ('Lahore Warehouse'),
-- ('Islamabad Store'),
-- ('Multan Store'),
-- ('Quetta Store');

-- Insert data into product_batches
INSERT INTO public.product_batches (quantity, product_id, purchase_price, inventory_id) VALUES
(100, 1, 100000, 1),
(200, 2, 500,  2),
(300, 3, 150, 3),
(50, 4, 7500, 4),
(500, 5, 50, 5);

-- Insert data into batch_details
INSERT INTO public.batch_details (batch_id, batch_number, manufacture_date, expiry_date) VALUES
(1, 'BATCH001', '2024-01-01', '2025-01-01'),
(2, 'BATCH002', '2024-02-01', '2025-02-01'),
(3, 'BATCH003', '2024-03-01', '2025-03-01'),
(4, 'BATCH004', '2024-04-01', '2025-04-01'),
(5, 'BATCH005', '2024-05-01', '2025-05-01');

-- Insert data into inventory_records
INSERT INTO public.inventory_records (batch_id, quantity, record_type, inventory_id) VALUES
(1, 50, 'IN', 1),
(2, 100, 'IN', 2),
(3, 150, 'IN', 3),
(4, 20, 'IN', 4),
(5, 250, 'IN', 5);

-- Insert data into accounts
INSERT INTO public.accounts (name, category, min_limit, max_limit, balance, owner_id) VALUES
('Cash Account', 1, NULL, NULL, 100000, 1),
('Bank Account', 1, NULL, NULL, 200000, 2),
('Inventory Account', 1, NULL, NULL, 150000, 3),
('Sales Revenue', 4, NULL, NULL, 300000, 4),
('Expenses Account', 5, NULL, NULL, 50000, 5);

-- Insert data into company_bookings
INSERT INTO public.company_bookings (company_id, amount, quantity, product_id) VALUES
(1, 50000, 5, 1),
(2, 10000, 20, 2),
(3, 15000, 30, 3),
(4, 3000, 2, 4),
(5, 500, 10, 5);

-- Insert data into company_sales_reps
INSERT INTO public.company_sales_reps (name, contact, address, company_id) VALUES
('Ahmed Raza', '03001234568', 'Karachi, Sindh', 1),
('Fatima Noor', '03214567891', 'Lahore, Punjab', 2),
('Hassan Ali', '03331234568', 'Islamabad, ICT', 3),
('Sara Malik', '03451234568', 'Multan, Punjab', 4),
('Zainab Khan', '03121234568', 'Quetta, Balochistan', 5);

-- Insert data into customers
INSERT INTO public.customers (name, address, phone) VALUES
('Hamza Shah', 'Karachi, Sindh', '03011234567'),
('Zara Tariq', 'Lahore, Punjab', '03214567892'),
('Aliya Kamran', 'Islamabad, ICT', '03331234569'),
('Raza Hussain', 'Multan, Punjab', '03451234569'),
('Maira Qasim', 'Quetta, Balochistan', '03121234569');

-- Insert data into sales
INSERT INTO public.sales (customer_id, product_id, quantity, account_id, price, stakeholder_id, batch_id) VALUES
(1, 1, 1, 1, 100000, 1, 1),
(2, 2, 2, 2, 1000, 2, 2),
(3, 3, 3, 3, 450, 3, 3),
(4, 4, 1, 4, 15000, 4, 4),
(5, 5, 5, 5, 250, 5, 5);


-- Insert data into credit_payment
INSERT INTO public.credit_payment (sale_id, amount_left, amount_paid, account_id) VALUES
(1, 50000, 50000, 1),
(2, 500, 500, 2),
(3, 225, 225, 3),
(4, 7500, 7500, 4),
(5, 125, 125, 5);

-- Insert data into transactions
INSERT INTO public.transactions (amount, transaction_type, from_account_id, to_account_id) VALUES
(50000, 'TRANSFER', 1, 2),
(10000, 'TRANSFER', 2, 3),
(15000, 'TRANSFER', 3, 4),
(3000, 'DEPOSIT', 5, 5),
(500, 'WITHDRAWAL', 1, 1);


---------------------------------------------------------------
-- Trigger for sale records
---------------------------------------------------------------


CREATE OR REPLACE FUNCTION update_batch_before_sale() 
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the batch has enough quantity for the sale, allowing it to reduce to zero
    IF (SELECT quantity FROM product_batches WHERE id = NEW.batch_id) < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient quantity in batch for this sale';
    END IF;

    -- Decrease the quantity of the batch by the quantity sold
    UPDATE product_batches
    SET quantity = quantity - NEW.quantity
    WHERE id = NEW.batch_id;

    -- Check if the quantity has reached zero, and if so, mark the batch as inactive
    IF (SELECT quantity FROM product_batches WHERE id = NEW.batch_id) = 0 THEN
        UPDATE product_batches
        SET is_active = FALSE
        WHERE id = NEW.batch_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_sale_insert
BEFORE INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION update_batch_before_sale();

---------------------------------------------------------------
-- Trigger for account records
---------------------------------------------------------------


CREATE OR REPLACE FUNCTION increment_account_balance_after_sale() 
RETURNS TRIGGER AS $$
BEGIN
    -- Increment the account balance by the total sale amount (price * quantity)
    UPDATE accounts
    SET balance = balance + (NEW.price * NEW.quantity)
    WHERE id = NEW.account_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_sale_insert
AFTER INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION increment_account_balance_after_sale();

---------------------------------------------------------------
-- Trigger for inventory records
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION record_inventory_out_after_sale()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert an "OUT" inventory record when a sale is made
    INSERT INTO inventory_records (batch_id, quantity, record_type, inventory_id)
    VALUES (NEW.batch_id, NEW.quantity, 'OUT', (SELECT inventory_id FROM product_batches WHERE id = NEW.batch_id));

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_sale_insert_inventory
AFTER INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION record_inventory_out_after_sale();




CREATE OR REPLACE FUNCTION record_inventory_in_after_batch_registration()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert an "IN" inventory record when a new batch is registered
    INSERT INTO inventory_records (batch_id, quantity, record_type, inventory_id)
    VALUES (NEW.id, NEW.quantity, 'IN', NEW.inventory_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_batch_insert_inventory
AFTER INSERT ON product_batches
FOR EACH ROW
EXECUTE FUNCTION record_inventory_in_after_batch_registration();



CREATE OR REPLACE FUNCTION record_inventory_adjustment_after_batch_update()
RETURNS TRIGGER AS $$
DECLARE
    old_quantity numeric(10, 2);
BEGIN
    old_quantity := (SELECT quantity FROM product_batches WHERE id = NEW.id);

    IF NEW.quantity > old_quantity THEN
        -- Insert an "IN" inventory record if the quantity increased
        INSERT INTO inventory_records (batch_id, quantity, record_type, inventory_id)
        VALUES (NEW.id, NEW.quantity - old_quantity, 'IN', NEW.inventory_id);
    ELSIF NEW.quantity < old_quantity THEN
        -- Insert an "OUT" inventory record if the quantity decreased
        INSERT INTO inventory_records (batch_id, quantity, record_type, inventory_id)
        VALUES (NEW.id, old_quantity - NEW.quantity, 'OUT', NEW.inventory_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_batch_update_inventory
AFTER UPDATE ON product_batches
FOR EACH ROW
EXECUTE FUNCTION record_inventory_adjustment_after_batch_update();



--------------------------------------------
-- Trigger for transactions
--------------------------------------------
-- Create a function to update account balances based on transaction type
CREATE OR REPLACE FUNCTION update_account_balance() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.transaction_type = 'DEPOSIT' THEN
        UPDATE public.accounts
        SET balance = balance + NEW.amount
        WHERE id = NEW.to_account_id;
    ELSIF NEW.transaction_type = 'WITHDRAWAL' THEN
        UPDATE public.accounts
        SET balance = balance - NEW.amount
        WHERE id = NEW.from_account_id;
    ELSIF NEW.transaction_type = 'TRANSFER' THEN
        UPDATE public.accounts
        SET balance = balance - NEW.amount
        WHERE id = NEW.from_account_id;

        UPDATE public.accounts
        SET balance = balance + NEW.amount
        WHERE id = NEW.to_account_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to invoke the function after an insert on the transactions table
CREATE TRIGGER update_balance_trigger
AFTER INSERT ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION update_account_balance();





------------------------------------------------------
-- Damage log
------------------------------------------------------
-- Function to log inventory record as 'DAMAGED' when a product damage occurs
CREATE OR REPLACE FUNCTION log_inventory_damage()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into inventory_records with record_type 'DAMAGED'
    INSERT INTO inventory_records (batch_id, quantity, record_type, inventory_id)
    VALUES (NEW.product_id, NEW.quantity, 'DAMAGED', NULL);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger that calls the function after insert on product_damages
CREATE TRIGGER after_product_damage_insert
AFTER INSERT ON product_damages
FOR EACH ROW
EXECUTE FUNCTION log_inventory_damage();


COMMIT;
