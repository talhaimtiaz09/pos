-- Batch details table
CREATE TABLE IF NOT EXISTS public.batch_details (
    id serial PRIMARY KEY,
    batch_number varchar(50) NOT NULL UNIQUE,
    manufacture_date date DEFAULT NULL,
    expiry_date date
);

-- Inventory table
CREATE TABLE IF NOT EXISTS public.inventory (
    id serial PRIMARY KEY,
    inventory_name varchar(255) NOT NULL UNIQUE,
);
-- Product batches table
CREATE TABLE IF NOT EXISTS public.product_batches (
    id serial PRIMARY KEY,
    quantity numeric(10, 2) NOT NULL CHECK (quantity > 0),
    product_id integer NOT NULL,
    purchase_price numeric(10, 2) NOT NULL,
    is_active boolean DEFAULT TRUE,
    additional_details_id integer,
    location_id integer,
    inventory_id integer,
    FOREIGN KEY (additional_details_id) REFERENCES public.batch_details (id),
    FOREIGN KEY (product_id) REFERENCES public.products (id)
    FOREIGN KEY (location_id) REFERENCES public.inventory_locations (id)
    FOREIGN KEY (inventory_id) REFERENCES public.inventory (id)
);


-- Inventory records table
CREATE TABLE IF NOT EXISTS public.inventory_records (
    id serial PRIMARY KEY,
    batch_id integer NOT NULL,
    quantity numeric(10, 2) NOT NULL CHECK (quantity > 0),
    record_type varchar(50) NOT NULL CHECK (record_type IN ('IN', 'OUT', 'ADJUSTMENT')),
    record_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES public.product_batches (id),
    FOREIGN KEY (inventory_id) REFERENCES public.inventory (id)
);

-- Inventory locations table
CREATE TABLE IF NOT EXISTS public.inventory_locations (
    id serial PRIMARY KEY,
    location_name varchar(255) NOT NULL UNIQUE
);

-- Stock table
CREATE TABLE IF NOT EXISTS public.stock (
    id serial PRIMARY KEY,
    product_id integer,
    current_stock numeric(10, 2) NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
    min_limit numeric(10, 2) DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES public.products (id)
);

-- Indexes for optimization
CREATE INDEX idx_product_batches_inventory_item_id ON public.product_batches (inventory_item_id);
CREATE INDEX idx_inventory_inventory_id ON public.inventory (product_id, location_id);
CREATE INDEX idx_inventory_records_inventory_id ON public.inventory_records (inventory_id);
CREATE INDEX idx_batch_locations_batch_id ON public.batch_locations (batch_id);
CREATE INDEX idx_stock_product_id ON public.stock (product_id);

