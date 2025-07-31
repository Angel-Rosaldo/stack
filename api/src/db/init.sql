-- Tabla de usuarios para autenticación (CRM)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    rol VARCHAR(50) DEFAULT 'admin',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contactos/leads (Landing + CRM)
CREATE TABLE IF NOT EXISTS contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    mensaje TEXT,
    origen VARCHAR(50) DEFAULT 'landing',
    estado VARCHAR(50) DEFAULT 'nuevo',
    asignado_a INTEGER REFERENCES usuarios(id),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario admin inicial (password: Admin1234)
INSERT INTO usuarios (email, password, nombre, rol)
VALUES (
    'admin@crm.com',
    '$2a$10$N9qo8uLOickgx3Zmrzo5.TB6dUh8fJd.VvjQ70q6Rq7Z/3ZQ0QJQO', 
    'Administrador',
    'superadmin'
) ON CONFLICT (email) DO NOTHING;