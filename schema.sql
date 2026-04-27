-- Create Tables for Barber Shop System

-- 1. Services (Cuts, Beard, etc.)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products (Shop items)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_phone TEXT,
    service_id UUID REFERENCES services(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'scheduled', -- scheduled, in-progress, completed, cancelled
    total_price DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Settings
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert some default services
INSERT INTO services (name, description, price, duration_minutes) VALUES
('Corte Masculino', 'Corte de cabelo tradicional ou moderno', 40.00, 45),
('Barba', 'Aparar e desenhar a barba com navalha', 30.00, 30),
('Combo (Corte + Barba)', 'Pacote completo', 60.00, 60),
('Sobrancelha', 'Limpeza e desenho da sobrancelha', 15.00, 15);

-- Insert some default products
INSERT INTO products (name, description, price, stock_quantity) VALUES
('Pomada Modeladora', 'Efeito matte, fixação forte', 35.00, 10),
('Óleo para Barba', 'Hidratação e brilho', 45.00, 5),
('Shampoo 3 em 1', 'Cabelo, barba e corpo', 25.00, 8);
