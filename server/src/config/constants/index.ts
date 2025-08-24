import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const enviroment = process.env.NODE_ENV;

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION,
};

export const dbConstants = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};
