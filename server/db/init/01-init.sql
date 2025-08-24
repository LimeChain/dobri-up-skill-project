CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, first_name, last_name, role) VALUES
    ('admin@dobri.com', '$2b$10$rQZ8N3YqG8X9vB2nM4kL6p', 'Admin', 'User', 'ADMIN')
ON CONFLICT (email) DO NOTHING;
