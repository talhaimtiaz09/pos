BEGIN;

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
DROP TABLE IF EXISTS public.inventory_locations CASCADE;
DROP TABLE IF EXISTS public.batch_locations CASCADE;

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
    category_id integer,
    max_limit numeric(10, 2) DEFAULT 0,
    min_limit numeric(10, 2) DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES public.product_categories (id)
);


-- Table for storing batch details 
CREATE TABLE IF NOT EXISTS public.batch_details (
    id serial PRIMARY KEY,
    batch_number varchar(50) NOT NULL,
    manufacture_date date DEFAULT NULL,
    expiry_date date
);

-- Table for storing product batches
CREATE TABLE IF NOT EXISTS public.product_batches (
    id serial PRIMARY KEY,
    quantity numeric(10, 2) NOT NULL,
    inventory_item_id integer NOT NULL,
    purchase_price numeric(10, 2) NOT NULL,
    is_active boolean DEFAULT TRUE,
    additional_details_id integer,
    FOREIGN KEY (additional_details_id) REFERENCES public.batch_details (id),
    FOREIGN KEY (inventory_item_id) REFERENCES public.products (id)
);

-- Table for storing inventory records (movements of inventory)
CREATE TABLE IF NOT EXISTS public.inventory_records (
    id serial PRIMARY KEY,
    inventory_id integer NOT NULL,
    batch_id integer NOT NULL,
    quantity numeric(10, 2) NOT NULL,
    record_type varchar(50) NOT NULL, -- e.g., "IN", "OUT", "ADJUSTMENT"
    record_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES public.product_batches (id),
    FOREIGN KEY (inventory_id) REFERENCES public.inventory (id)
);

-- Create inventory locations table
CREATE TABLE IF NOT EXISTS public.inventory_locations (
    id serial PRIMARY KEY,
    location_name varchar(255) NOT NULL UNIQUE
);

-- Create batch locations table
CREATE TABLE IF NOT EXISTS public.batch_locations (
    id serial PRIMARY KEY,
    batch_id integer NOT NULL,
    location_id integer NOT NULL,
    FOREIGN KEY (batch_id) REFERENCES public.product_batches (id),
    FOREIGN KEY (location_id) REFERENCES public.inventory_locations (id)
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
    category integer NOT NULL,
    account_id integer,
    FOREIGN KEY (account_id) REFERENCES public.accounts (id),
    FOREIGN KEY (category) REFERENCES public.expense_categories (id)
);



-- Create weekly analytics table
CREATE TABLE IF NOT EXISTS public.weekly_analytics (
    id serial PRIMARY KEY,
    month varchar(50) NOT NULL,
    year integer NOT NULL,
    customer_gained integer NOT NULL,
    damage numeric(10, 2) NOT NULL,
    total_revenue numeric(10, 2) NOT NULL,
    expense numeric(10, 2) NOT NULL,
    sales numeric(10, 2) NOT NULL
);

-- Create sales types table
CREATE TABLE IF NOT EXISTS public.sales_types (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
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
    discount numeric(5, 2) DEFAULT 0,
    sale_type_id integer,
    stakeholder_id integer,
    FOREIGN KEY (customer_id) REFERENCES public.customers (id),
    FOREIGN KEY (product_id) REFERENCES public.products (id),
    FOREIGN KEY (account_id) REFERENCES public.accounts (id),
    FOREIGN KEY (sale_type_id) REFERENCES public.sales_types (id),
    FOREIGN KEY (stakeholder_id) REFERENCES public.stakeholder (id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id serial PRIMARY KEY,
    date timestamp DEFAULT CURRENT_TIMESTAMP,
    amount numeric(10, 2) NOT NULL,
    transaction_type varchar(50) NOT NULL,
    from_account_id integer NOT NULL,
    to_account_id integer NOT NULL,
    FOREIGN KEY (from_account_id) REFERENCES public.accounts (id),
    FOREIGN KEY (to_account_id) REFERENCES public.accounts (id)
);

-- Table for storing stock
CREATE TABLE IF NOT EXISTS public.stock (
    id serial PRIMARY KEY,
    product_id integer,
    current_stock numeric(10, 2) NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES public.products (id)
);

-- Table for storing credit sales
CREATE TABLE IF NOT EXISTS public.credit_sales (
    id serial PRIMARY KEY,
    date timestamp DEFAULT CURRENT_TIMESTAMP,
    customer_id integer,
    balance numeric(10, 2) NOT NULL,
    sale_id integer,
    FOREIGN KEY (customer_id) REFERENCES public.customers (id),
    FOREIGN KEY (sale_id) REFERENCES public.sales (id)
);


-- Create damages table
CREATE TABLE IF NOT EXISTS public.product_damages (
    id serial PRIMARY KEY,
    quantity numeric(10, 2) NOT NULL,
    damage_date date DEFAULT CURRENT_TIMESTAMP,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES public.products (id)
);


END;
