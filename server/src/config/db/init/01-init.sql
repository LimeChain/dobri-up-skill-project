CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100),
    role user_role DEFAULT 'USER',
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, "firstName", "lastName", password, role) VALUES
    ('admin@dobri.com', 'Admin', 'User', '$2b$10$rQZ8N3YqG8X9vB2nM4kL6p', 'ADMIN')
ON CONFLICT (email) DO NOTHING;
